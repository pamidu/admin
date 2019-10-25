import { SET_AUTH_STATUS } from './types';
import { authUtil } from 'Utils/AuthUtil';

// Set logged in user current user
export const setAuthentionStatus = currentStatus => {
  return {
    type: SET_AUTH_STATUS,
    payload: currentStatus
  };
};

// Logout current user
export const logoutCurrentUser = (history) => dispatch => {
  authUtil("postData", null, "/account/sign-out")
    .then(result => {
      if (result.status === 200) {
        sessionStorage.removeItem('userToken');
        dispatch(setAuthentionStatus(false));
      } else {
        history.push("/");
      }
    });
};
