import { authUtil } from "Utils/AuthUtil";
import { isEmpty } from "Utils/CommonUtil";

import PropTypes from "prop-types";

const AgencyList = async (mode = "addnew") => {  
  let obj = [];

  let status = "";

  if (mode === "addnew") {
    status = "ACTIVE";
  }

  let result = await authUtil("getData", null, `/agencies?status=${status}`);
  if (result.status === 200) {
    for (let x in result.data) {
      obj.push({label: `${result.data[x].legalName}-${result.data[x].code}`, value: result.data[x].id});
    }

    if (isEmpty(obj)) {
      await obj.push({label: "No Value", value: ""});
    }

    return obj;
  } else {
    console.log("Retrieve Fail");
  };
};

AgencyList.propTypes = {
  mode:  PropTypes.string
}

export default AgencyList;
