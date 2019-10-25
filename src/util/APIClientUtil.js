import axios from 'axios';
import PropTypes from "prop-types";

const APIClientUtil = async (method, url, body, headers) => {
  let result;

  const dataOrParams = ["POST", "PUT"].includes(method) ? "data" : "params";

  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

  await axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: body
    })
    .then(res => {
      result = res;
    })
    .catch(error => {
      if (error.response && error.response.status === 403) {
        sessionStorage.removeItem('userToken');
        location.replace("/");
      } else {
        result = error.response;
      }
    })

    return await result;
}

APIClientUtil.propTypes = {
  method: PropTypes.string,
  requestURL: PropTypes.string,
  body: PropTypes.object,
  header: PropTypes.object
};

export default APIClientUtil;
