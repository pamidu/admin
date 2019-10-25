import { SET_AUTH_STATUS } from 'Actions/types';

const initialState = {
  isAuthenticated: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_STATUS:
      return {
        ...state,
        isAuthenticated: action.payload
      };
    default:
      return state;
  }
}
