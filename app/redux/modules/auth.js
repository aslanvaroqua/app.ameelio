import { fromJS } from 'immutable';
// MongoDB Stitch SDK
import { Stitch } from 'mongodb-stitch-browser-sdk';
import {
  INIT,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOG_IN,
  LOG_IN_SUCESS,
} from '../../actions/actionConstants';

// MongoDB Stitch client
const appId = 'ameelio-jrmxg';
const client = Stitch.initializeDefaultAppClient(appId);

const initialState = {
  stitchClient: client,
  user: false,
  loading: false,
  error: '',
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case INIT:
      return state;
    case REGISTER_USER:
    case LOG_IN:
      return state.merge({ loading: true, error: '' });
    case REGISTER_USER_SUCCESS:
    case LOG_IN_SUCESS:
      return state.merge({ loading: false, user: action.payload.user });
    default:
      return state;
  }
}
