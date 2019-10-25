import { SET_BUTTON_LOADING, SET_HEADER_NAME, SET_SEARCH_PARAMS, SET_PAGE_NUMBER } from "Actions/types";

const initialState = {
  buttonLoading: false,
  headerName: null,
  category: "AGENCY",
  status: "NONE",
  pageNumber: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BUTTON_LOADING:
      return {
        ...state,
        buttonLoading: !(state.buttonLoading)
      };
    case SET_HEADER_NAME:
      return {
        ...state,
        headerName: action.payload
      };
    case SET_SEARCH_PARAMS:
      return {
        ...state,
        category: action.payload.category,
        status: action.payload.status
      };
    case SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.payload
      };
    default:
      return state;
  }
}