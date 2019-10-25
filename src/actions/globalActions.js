import { SET_BUTTON_LOADING, SET_HEADER_NAME, SET_SEARCH_PARAMS, SET_PAGE_NUMBER } from './types';

// Set Button Loading
export const setButtonLoading = () => dispatch => {
  dispatch({
    type: SET_BUTTON_LOADING
  })
};

// Set Page Header Name
export const setHeaderName = headerName => {
  return {
    type: SET_HEADER_NAME,
    payload: headerName
  };
};

// Set search parameters
export const setSearchParams = (cat, status) => {
  return {
    type: SET_SEARCH_PARAMS,
    payload: {category: cat, status: status}
  };
};

// Set search parameters
export const setPageNumber = (pageNumber) => {
  return {
    type: SET_PAGE_NUMBER,
    payload: pageNumber
  };
};
