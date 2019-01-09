import {
  takeLatest,
  call,
  fork,
  put,
  // select,
} from 'redux-saga/effects';
import { Stitch } from 'mongodb-stitch-browser-sdk';
import uuidv4 from 'uuid/v4';

import { SEND_LETTER } from '../actions/actionConstants';
import {
  uploadImageFailure,
  verifyRecipientAddressFailure,
  sendLetterFailure,
  sendLetterSuccess,
} from '../actions/LettersActions';

// function getStitchClient(state) {
//   return state.getIn(['auth', 'stitchClient']);
// }

function s3Upload({ imageKey, base64Image }) {
  return Stitch.defaultAppClient.callFunction('uploadImage', [imageKey, base64Image]);
}

function validateAddress({ recipientAddress }) {
  return Stitch.defaultAppClient.callFunction('validateAddress', [recipientAddress]);
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
    const result = yield call(sendLetterRequest, {
      imageUrl,
      recipientAddress,
      senderAddress,
      message,
    });
    console.log('letter sent successfully', result);
    if (result.error) {
      yield put(sendLetterFailure({
        sendLetterError: result.error.message,
      }));
    } else {
      alert(`Letter is accessible via ${result.url}`);
    }
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
    const result = yield call(validateAddress, { recipientAddress });
    console.log('verify recipientAddress result', result);
    if (deliverErrors.includes(result.deliverability)) {
      yield put(verifyRecipientAddressFailure({
        recipientAddressError: deliverErrorsObj[result.deliverability],
      }));
    } else {
      yield call(sendLetterSaga, {
        imageUrl,
        recipientAddress: {
          name: result.recipient,
          address_line1: result.primary_line,
          address_line2: result.secondary_line,
          address_city: result.components.city,
          address_state: result.components.state,
          address_zip: result.components.zip_code,
          address_country: 'US',
        },
        senderAddress,
        message,
      });
    }
  } catch (error) {
    console.log(error);
    yield put(verifyRecipientAddressFailure({
      recipientAddressError: 'Error, something went wrong while verifying recipient address.',
    }));
  }
}

function* uploadImage({
  base64Image,
  recipientAddress,
  senderAddress,
  message,
}) {
  try {
    const s3Bucket = 'skyhosting-ameelio-dev';
    const imageKey = `letters/${uuidv4()}.jpg`;
    const result = yield call(s3Upload, { imageKey, base64Image });
    console.log('upload image result', result);
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
