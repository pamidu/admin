import APIClientUtil from "./APIClientUtil";

export const authUtil = async (request, body, relativePath) => {

  let authorizedHeaderData = {
    "Authorization": sessionStorage.userToken
  };

  switch (request) {
    case "postData":
      return await APIClientUtil("POST", relativePath, body, authorizedHeaderData);
    case "getData":
      return await APIClientUtil("GET", `/admin${relativePath}`, null, authorizedHeaderData);
    case "updateData":
      return await APIClientUtil("PUT", relativePath, body, authorizedHeaderData);
    default:
      return await APIClientUtil("POST", relativePath, body, null);
  }

}