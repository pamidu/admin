import { authUtil } from "Utils/AuthUtil";
import { isEmpty } from "Utils/CommonUtil";

import PropTypes from "prop-types";

const ProducerList = async (branchId = "", mode = "addnew") => {  
  let obj = [];

  let status = "";

  if (mode === "addnew") {
    status = "ACTIVE";
  }

  let result = await authUtil("getData", null, `/producers?branch-id=${branchId}&status=${status}`);
  if (result.status === 200) {
    if (branchId){
      for (let x in result.data) {
        obj.push({label: `${result.data[x].legalFirstName}-${result.data[x].code}`, value: result.data[x].id});
      }
    }

    if (isEmpty(obj)) {
      await obj.push({label: "No Value", value: ""});
    }

    return obj;
  } else {
    console.log("Retrieve Fail");
  };
};

ProducerList.propTypes = {
  branchId: PropTypes.string,
  mode: PropTypes.string
}

export default ProducerList;
