import { fromJS } from 'immutable';

import {
  UPDATE_LETTER_INFO,
  UPLOAD_IMAGE_FAILURE,
  VERIFY_RECIPIENT_ADDRESS_FAILURE,
  SEND_LETTER,
  SEND_LETTER_SUCCESS,
  SEND_LETTER_FAILURE
} from '../../actions/actionConstants';

const initialState = {
  loading: false,
  imageUploadError: '',
  recipientAddressError: '',
  sendLetterError: '',
  letterInfo: {
    inmate: null,
    message: '',
    imageBase64: ''
  },
  lettersUrl: []
};
const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case UPDATE_LETTER_INFO:
      return state.withMutations(mutableState => {
        const {
          payload: { key, info }
        } = action;
        mutableState.setIn(['letterInfo', key], info);
      });
    case SEND_LETTER:
      return state.withMutations(mutableState => {
        mutableState.set('loading', true);
      });
    case UPLOAD_IMAGE_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set('loading', false);
        mutableState.set('imageUploadError', action.payload.imageUploadError);
      });
    case VERIFY_RECIPIENT_ADDRESS_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set('loading', false);
        mutableState.set(
          'recipientAddressError',
          action.payload.recipientAddressError
        );
      });
    case SEND_LETTER_FAILURE:
      return state.withMutations(mutableState => {
        mutableState.set('loading', false);
        mutableState.set('sendLetterError', action.payload.sendLetterError);
      });
    case SEND_LETTER_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set('loading', false);
        mutableState.set('imageUploadError', '');
        mutableState.set('recipientAddressError', '');
        mutableState.set('sendLetterError', '');
        mutableState.set(
          'lettersUrl',
          mutableState.get('lettersUrl').push(action.payload.letterUrl)
        );
      });
    default:
      return state;
  }
}
