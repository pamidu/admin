import { authUtil } from "Utils/AuthUtil";
import { isEmpty } from "Utils/CommonUtil";

import PropTypes from "prop-types";

const RegionList = async (agencyId = "", mode = "addnew") => {
  let obj = [];

  let status = "";

  if (mode === "addnew") {
    status = "ACTIVE";
  }
  
  let result;

  if (status) {
    result = await authUtil("getData", null, `/regions?agency-id=${agencyId}&status=${status}`);
  } else {
    result = await authUtil("getData", null, `/regions?status=&agency-id=${agencyId}`);
  }

  if (result.status === 200) {
    if (agencyId) {
      for (let x in result.data) {
        obj.push({ label: `${result.data[x].name}-${result.data[x].code}`, value: result.data[x].id });
      }
    }

    if (isEmpty(obj)) {
      await obj.push({ label: "No Value", value: "" });
    }

    return obj;
  } else {
    console.log("Retrieve Fail");
  };
};

RegionList.propTypes = {
  agencyId: PropTypes.string,
  mode: PropTypes.string
}

export default RegionList;
