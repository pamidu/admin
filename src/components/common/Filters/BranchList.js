import { authUtil } from "Utils/AuthUtil";
import { isEmpty } from "Utils/CommonUtil";

import PropTypes from "prop-types";

const BranchList = async (regionId = "", mode = "addnew") => {
  let obj = [];

  let status = "";

  if (mode === "addnew") {
    status = "ACTIVE";
  }

  let result = await authUtil("getData", null, `/branches?region-id=${regionId}&status=${status}`);
  if (result.status === 200) {
    if (regionId) {
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

BranchList.propTypes = {
  regionId: PropTypes.string,
  mode: PropTypes.string
}

export default BranchList;
