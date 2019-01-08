import {
  takeLatest,
  call,
  fork,
  put,
  select,
} from 'redux-saga/effects';
import { Stitch, AwsServiceClient, AwsRequest } from 'mongodb-stitch-browser-sdk';
import uuidv4 from 'uuid/v4';

import { SEND_LETTER } from '../actions/actionConstants';
import {
  uploadImageFailure,
  verifyRecipientAddressFailure,
  verifySenderAddressFailure,
  sendLetterFailure,
  sendLetterSuccess,
} from '../actions/LettersActions';

function getStitchClient(state) {
  return state.getIn(['auth', 'stitchClient']);
}

function dataURItoBlob(dataURI) {
  const binary = atob(dataURI.split(',')[1]);
  const array = [];
  for (let i = 0; i < binary.length; i += 1) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
}

function s3Upload({ aws, request }) {
  return aws.execute(request.build());
}

function verifyAddress({ address }) {
  return Stitch.defaultAppClient.callFunction('validateAddress', [address]);
}

function sendLetterRequest({
  imageUrl,
  recipientAddress,
  senderAddress,
  message,
}) {
  return Stitch.defaultAppClient.callFunction('sendLetter', [
    recipientAddress,
    senderAddress,
    imageUrl,
    message,
  ]);
}

function* sendLetterSaga({
  imageUrl,
  recipientAddress,
  senderAddress,
  message,
}) {
  try {
    yield call(sendLetterRequest, {
      imageUrl,
      recipientAddress,
      senderAddress,
      message,
    });
    yield put(sendLetterSuccess());
  } catch (error) {
    console.log(error);
    yield put(sendLetterFailure({
      sendLetterError: 'Error sending letter. Try again.'
    }));
  }
}

function* verifyAddresses({
  imageUrl,
  recipientAddress,
  senderAddress,
  message,
}) {
  const deliverErrors = [
    'deliverable_incorrect_unit',
    'deliverable_missing_unit',
    'undeliverable'
  ];
  const deliverErrorsObj = {
    deliverable_incorrect_unit: "The address is deliverable to the building's default address but the secondary unit provided may not exist. There is a chance the mail will not reach the intended recipient",
    deliverable_missing_unit: "The address is deliverable to the building's default address but is missing secondary unit information. There is a chance the mail will not reach the intended recipient.",
    undeliverable: 'The address is not deliverable according to the USPS.',
  };
  try {
    const recipientVerifiedAddress = yield call(verifyAddress, { recipientAddress });
    const senderVerifiedAddress = yield call(verifyAddress, { senderAddress });
    if (deliverErrors.includes(recipientVerifiedAddress.deliverability)) {
      yield put(verifyRecipientAddressFailure({
        recipientAddressError: deliverErrorsObj[recipientVerifiedAddress.deliverability],
      }));
    } else if (deliverErrors.includes(senderVerifiedAddress.deliverability)) {
      yield put(verifySenderAddressFailure({
        senderAddressError: deliverErrorsObj[senderVerifiedAddress.deliverability],
      }));
    } else {
      yield call(sendLetterSaga, {
        imageUrl,
        recipientAddress,
        senderAddress,
        message,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* uploadImage({
  base64Image,
  recipientAddress,
  senderAddress,
  message,
}) {
  try {
    const client = yield select(getStitchClient);
    const aws = client.getServiceClient(AwsServiceClient.factory, 'ameelio-aws');
    const s3Bucket = 'ameelio-dev';
    const imageKey = `${uuidv4()}.jpg`;
    const args = {
      ACL: 'public-read',
      Bucket: s3Bucket,
      ContentType: 'image/jpeg',
      Key: imageKey,
      Body: dataURItoBlob(base64Image),
    };
    const request = new AwsRequest.Builder()
      .withService('s3')
      .withAction('PutObject')
      .withRegion('us-east-1')
      .withArgs(args);
    yield call(s3Upload, { aws, request });
    yield call(verifyAddresses, {
      imageUrl: `https://s3.amazonaws.com/${s3Bucket}/${imageKey}`,
      recipientAddress,
      senderAddress,
      message,
    });
  } catch (error) {
    console.log(error);
    yield put(uploadImageFailure({
      imageUploadError: 'Error uploading image.'
    }));
  }
}

function* sendLetter(action) {
  const {
    payload: {
      base64Image,
      recipientAddress,
      senderAddress,
      message,
    },
  } = action;
  yield call(uploadImage, {
    base64Image,
    recipientAddress,
    senderAddress,
    message,
  });
}

function* watchSendLetterRequest() {
  yield takeLatest(SEND_LETTER, sendLetter);
}

const lettersSagas = [
  fork(watchSendLetterRequest),
];

export default lettersSagas;
