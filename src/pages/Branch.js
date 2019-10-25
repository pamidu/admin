import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import BranchForm from "Components/branch/BranchForm";
import Message from "Messages/Message";
import Spinner from "Common/Spinner";

import { setHeaderName } from "Actions/globalActions";
import { setButtonLoading } from "Actions/globalActions";

import AgencyList from "Common/Filters/AgencyList";
import RegionList from "Common/Filters/RegionList";
import FilterStatus from "Common/Filters/FilterStatus";

import { authUtil } from "Utils/AuthUtil";
import { setOnlyAlpha, setPhoneFormat, filterOnlyNumbers } from "Utils/CommonUtil";
import { notification } from "Utils/ImageList";

import BranchValidations from "Components/branch/BranchValidations";

const statusOptions = FilterStatus.options;

class Branch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      agencyId: "",
      regionId: "",
      branchaddress: "",
      branchemail: "",
      branchphone: "",
      contactname: "",
      contactphone: "",
      contactemail: "",
      code: "",
      status: 'ACTIVE',
      mode: this.props.match.params.mode,
      response: '',
      loading: true,
      agencyOptions: [],
      regionOptions: [],
      errors: [],
    };
  }

  componentDidMount = async () => {
    this.props.setHeaderName(" / BRANCH");
    
    if (["view", "edit"].includes(this.state.mode)) {
      let selectAgencyOptions = await AgencyList(this.state.mode)
      this.setState({
        agencyOptions: selectAgencyOptions
      });

      await this.setFields();

      let selectRegionOptions = await RegionList(this.state.agencyId, this.state.mode);
      this.setState({
        regionOptions: selectRegionOptions
      });
    } else if (this.state.mode !== "addnew") {
      this.props.history.push("/dashboard");
    } else {
      let selectAgencyOptions = await AgencyList(this.state.mode)
      this.setState({
        agencyOptions: selectAgencyOptions,
        agencyId: selectAgencyOptions[0].value
      });

      let selectRegionOptions = await RegionList(this.state.agencyId, this.state.mode);
      this.setState({
        regionOptions: selectRegionOptions,
        regionId: selectRegionOptions[0].value
      });
    }

    let selectRegionOptions = await RegionList(this.state.agencyId, this.state.mode);
    this.setState({
      regionOptions: selectRegionOptions,
    });

    await this.setState({loading: false});
  }
  
  componentDidUpdate(prevProps) {
    if(this.props.match.params.mode !== prevProps.match.params.mode) 
    {
      this.setState({mode: this.props.match.params.mode})
    }
  } 

  addBranch = async (e) => {
    e.preventDefault();

    const formData = {
      name: this.state.name,
      address: this.state.branchaddress,
      email: this.state.branchemail,
      phone: filterOnlyNumbers(this.state.branchphone),
      primaryContact: {
        email: this.state.contactemail,
        name: this.state.contactname,
        phone: filterOnlyNumbers(this.state.contactphone)
      }
    };

		if (BranchValidations(this.state).isValid) {
			this.props.setButtonLoading();

			// Branch Details
			let result = await authUtil("postData", formData, `/admin/agencies/${this.state.agencyId}/regions/${this.state.regionId}/branches`);
			if (result.status === 200) {
				this.setState({ response: "" });
        this.props.history.push("/dashboard");
			} else {
        this.setState({ response: result.data.description });
			}
			await this.props.setButtonLoading();
		} else {
			await this.setState({ errors: BranchValidations(this.state).errors });
		}
  }

  editBranch = async (e) => {
    e.preventDefault();

    const formData = {
      name: this.state.name,
      address: this.state.branchaddress,
      email: this.state.branchemail,
      phone: filterOnlyNumbers(this.state.branchphone),
      primaryContact: {
        email: this.state.contactemail,
        name: this.state.contactname,
        phone: filterOnlyNumbers(this.state.contactphone)
      },
      status: statusOptions.find(statusOption => statusOption.value === this.state.status).label.toUpperCase()
    };

    if (BranchValidations(this.state).isValid) {
      this.props.setButtonLoading();

      // Agency Details
      let result = await authUtil("updateData", formData, `/admin/agencies/${this.props.match.params.agencyId}/regions/${this.props.match.params.regionId}/branches/${this.props.match.params.id}`);
      if (result.status === 200) {
        this.setState({ response: "" });
        this.props.history.push("/dashboard");
      } else {
        this.setState({ response: result.data.description });
      }
      await this.props.setButtonLoading();
    } else {
      await this.setState({ errors: BranchValidations(this.state).errors });
    }
  }

  onChange = (e) => {
		let val;
    
    if (["branchphone", "contactphone"].includes(e.target.name)) {
			val = setPhoneFormat(e.target.value);
		} else if (e.target.name === "contactname") {
			val = setOnlyAlpha(e.target.value);
		} else if (["agencyId"].includes(e.target.name)) {
      this.updateRegionOptions(e.target.value);
      val = e.target.value;
    } else {
			val = e.target.value;
    }
    
		this.setState({ [e.target.id]: val });
		delete this.state.errors[e.target.id];
		this.setState({ response: '' });
  }

  updateRegionOptions = async (agencyId) => {
    let selectRegionOptions = await  RegionList(agencyId, this.state.mode);
    this.setState({
      regionOptions: selectRegionOptions,
      regionId: selectRegionOptions[0].value
    });
  }

  onSelect = (e) => {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
    delete this.state.errors[e.target.id];
  }

  setFields = async () => {
    let result = await authUtil("getData", null, `/agencies/${this.props.match.params.agencyId}/regions/${this.props.match.params.regionId}/branches/${this.props.match.params.id}`);
    
    if (result.status === 200) {
      if (result.data.name) {
        this.setState({name: result.data.name});
      }
      if (result.data.agencyId) {
        this.setState({agencyId: result.data.agencyId});
      }
      if (result.data.regionId) {
        this.setState({regionId: result.data.regionId});
      }
      if (result.data.address) {
        this.setState({branchaddress: result.data.address});
      }
      if (result.data.phone) {
        this.setState({branchphone: setPhoneFormat(result.data.phone)});
      }
      if (result.data.email) {
        this.setState({branchemail: result.data.email});
      }
      if (result.data.primaryContact) {
        this.setState({contactname: result.data.primaryContact.name});
      }
      if (result.data.primaryContact) {
        this.setState({contactphone: setPhoneFormat(result.data.primaryContact.phone)});
      }
      if (result.data.primaryContact) {
        this.setState({contactemail: result.data.primaryContact.email});
      }
      if (result.data.corporateEmail) {
        this.setState({corporateEmail: result.data.corporateEmail});
      }
      if (result.data.contactPersonName) {
        this.setState({contactPersonName: result.data.contactPersonName});
      }
      if (result.data.contactPersonPhone) {
        this.setState({contactPersonPhone: setPhoneFormat(result.data.contactPersonPhone)});
      }
      if (result.data.contactPersonEmail) {
        this.setState({contactemail: result.data.contactPersonEmail});
      }
      if (result.data.code) {
        this.setState({code: result.data.code});
      }
      if (result.data.status) {
        this.setState({status: result.data.status});
      }
    } else {
      this.setState({response: result.data.description});
    };
  }

  render() {
    let responseMessage = (
      <Message type="error" containerStyle="bg-yellow-error" msgStyle="text-si-grey" icon={notification} message={this.state.response} />
    );

    let content;

    if (this.state.loading) {
      content = <Spinner />;
    } else {
      content = (
        <div className="container mx-auto px-8 pb-4 lg:px-24 lg:pb-8">
          {this.state.response && responseMessage}
          <BranchForm states={this.state} onChange={this.onChange} onSelect={this.onSelect} addBranch={this.addBranch} editBranch={this.editBranch} agencyId={this.props.match.params.agencyId} regionId={this.props.match.params.regionId} branchId={this.props.match.params.id} setFields={this.setFields} />
        </div>
      );
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

Branch.propTypes = {
  setHeaderName: PropTypes.func.isRequired,
  setButtonLoading: PropTypes.func.isRequired,
};

export default connect(
	null,
	{ setHeaderName, setButtonLoading }
)(withRouter(Branch));
