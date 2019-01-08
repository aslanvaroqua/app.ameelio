import { fromJS } from 'immutable';

import {
  UPLOAD_IMAGE_FAILURE,
  VERIFY_RECIPIENT_ADDRESS_FAILURE,
  VERIFY_SENDER_ADDRESS_FAILURE,
  SEND_LETTER,
  SEND_LETTER_SUCCESS,
  SEND_LETTER_FAILURE,
} from '../../actions/actionConstants';

const initialState = {
  loading: false,
  imageUploadError: '',
  recipientAddressError: '',
  senderAddressError: '',
  sendLetterError: '',
};
const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case SEND_LETTER:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', true);
      });
    case UPLOAD_IMAGE_FAILURE:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', false);
        mutableState.set('imageUploadError', action.payload.imageUploadError);
      });
    case VERIFY_RECIPIENT_ADDRESS_FAILURE:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', false);
        mutableState.set('recipientAddressError', action.payload.recipientAddressError);
      });
    case VERIFY_SENDER_ADDRESS_FAILURE:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', false);
        mutableState.set('senderAddressError', action.payload.senderAddressError);
      });
    case SEND_LETTER_FAILURE:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', false);
        mutableState.set('sendLetterError', action.payload.sendLetterError);
      });
    case SEND_LETTER_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', false);
        mutableState.set('imageUploadError', '');
        mutableState.set('recipientAddressError', '');
        mutableState.set('senderAddressError', '');
        mutableState.set('sendLetterError', '');
      });
    default:
      return state;
  }
}
