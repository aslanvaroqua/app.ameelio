import * as types from './actionConstants';

export const updateLetterInfo = (key, info) => ({
  type: types.UPDATE_LETTER_INFO,
  payload: { key, info }
});

// Init send letter process
export const sendLetter = (
  base64Image,
  recipientAddress,
  senderAddress,
  message
) => ({
  type: types.SEND_LETTER,
  payload: {
    base64Image,
    recipientAddress,
    senderAddress,
    message
  }
});

// Upload image failure
export const uploadImageFailure = ({ imageUploadError }) => ({
  type: types.UPLOAD_IMAGE_FAILURE,
  payload: { imageUploadError }
});

// Verify recipient address failure
export const verifyRecipientAddressFailure = ({ recipientAddressError }) => ({
  type: types.VERIFY_RECIPIENT_ADDRESS_FAILURE,
  payload: { recipientAddressError }
});

// Send letter failure
export const sendLetterFailure = ({ sendLetterError }) => ({
  type: types.SEND_LETTER_FAILURE,
  payload: { sendLetterError }
});

// Send letter success
export const sendLetterSuccess = letterUrl => ({
  type: types.SEND_LETTER_SUCCESS,
  payload: { letterUrl }
});
