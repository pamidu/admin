import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Message from "Messages/Message";
import AgencyForm from "Components/agency/AgencyForm";
import Spinner from "Common/Spinner";

import FilterStatus from "Common/Filters/FilterStatus";

import { setButtonLoading, setHeaderName } from "Actions/globalActions";

import { authUtil } from "Utils/AuthUtil";

import { setOnlyAlpha, setPhoneFormat, filterOnlyNumbers, setEINFormat, setOnlyDigit } from "Utils/CommonUtil";
import { notification } from "Utils/ImageList";

import AgencyValidations from "Components/agency/AgencyValidations";

import CountryStates from "Common/Filters/CountryStates";
import BusinessList from "Common/Filters/BusinessList";

const countryOptions = CountryStates.options;
const BusinessOptions = BusinessList.options;
const statusOptions = FilterStatus.options;

class Agency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legalName: "",
      doingBusinessAs: "",
      employerIdentificationNumber: "",
      licenseNumber: "",
      licensedStates: "",
      lineOfBusiness: "",
      licenseRenewalDate: "",
      corporateAddress: "",
      corporatePhone: "",
      corporateEmail: "",
      contactPersonName: "",
      contactPersonPhone: "",
      contactPersonEmail: "",
      legalfirstname: "",
      legallastname: "",
      superUserContactName: "",
      superUserEmail: "",
      producerNPN: "",
      producerPhoneNumber: "",
      producerLicenseNumber: "",
      producerLicensedStates: "",
      producerLinesofBusiness: "",
      producerLicenseRenewalDate: "",
      opraappointedcheck: false,
      commissionPaymentDetails: false,
      agencyManagementSystem: "",
      code: "",
      status: "ACTIVE",
      previousStatus: "",
      statusOptions: [],
      deactivationInitiator: null,
      deactivationReasonCode: null,
      deactivationComment: "",
      selectedLicensedStates: null,
      selectedProducerLicensedStates: null,
      selectedLineOfBusiness: null,
      selectedProducerLineOfBusiness: null,
      mode: this.props.match.params.mode,
      response: '',
      loading: true,
      errors: [],
    };
  }

  componentDidMount = async () => {
    this.props.setHeaderName("/ AGENCY");

    if (["view", "edit"].includes(this.state.mode)) {
      await this.setFields();
    } else if (this.state.mode !== "addnew") {
      this.props.history.push("/dashboard");
    }

    await this.filterStatus(this.state.mode, this.state.status);

    await this.setState({loading: false});
  }

  componentDidUpdate(prevProps) {
    if(this.props.match.params.mode !== prevProps.match.params.mode) 
    {
      this.setState({mode: this.props.match.params.mode})
    }
  } 

  onChange = (e) => {
		let val;
    
    if (["corporatePhone", "contactPersonPhone", "producerPhoneNumber"].includes(e.target.name)) {
			val = setPhoneFormat(e.target.value);
		} else if (["contactPersonName", "superUserContactName", "legalfirstname", "legallastname"].includes(e.target.name)) {
			val = setOnlyAlpha(e.target.value);
		} else if (["employerIdentificationNumber"].includes(e.target.name)) {
			val = setEINFormat(e.target.value);
		} else if (["licenseNumber"].includes(e.target.name)) {
			val = setOnlyDigit(e.target.value);
		} else if (["legalfirstname", "legallastname"].includes(e.target.name)) {
			val = setOnlyAlpha(e.target.value);
		} else if (["producerNPN", "producerLicenseNumber"].includes(e.target.name)) {
			val = setOnlyDigit(e.target.value);
		} else {
			val = e.target.value;
    }
    
		this.setState({ [e.target.id]: val });
		delete this.state.errors[e.target.id];
		this.setState({ response: '' });
  }

  onSelect = (e) => {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
    delete this.state.errors[e.target.id];
  }

  onDateChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    delete this.state.errors[e.target.name];
  };

  handleChange = async (selectedOption, e) => {
    delete this.state.errors[e.name];
    
    let selectedItems = [];

    if (e.name === "licensedStates") {
      await this.setState({ 
        selectedLicensedStates:  selectedOption,
      });
    } else if (e.name === "lineOfBusiness") {
      await this.setState({ 
        selectedLineOfBusiness:  selectedOption,
      });
    } else if (e.name === "producerLinesofBusiness") {
      await this.setState({ 
        selectedProducerLineOfBusiness:  selectedOption,
      });
    } else {
      await this.setState({ 
        selectedProducerLicensedStates:  selectedOption,
      });
    }
    
    for (let x in selectedOption) {
      selectedItems.push(selectedOption[x].value);
    }

    await this.setState({ 
      [e.name]:  selectedItems.join(", "),
    });
  };

  setMultiSelectValues = async (selectedArray, options) => {
    let obj = [];

    let splitArray = selectedArray.split(", ");

    for (let x in splitArray) {
      obj.push(options.find(option => option.value === splitArray[x]));
    }

    return obj;
  }

  filterStatus = (mode, status) => {
    let filteredStatuses = new Array()
    if (mode === 'addnew') {
      filteredStatuses.push(statusOptions[1])
      filteredStatuses.push(statusOptions[3])
    } else {
      filteredStatuses.push(statusOptions[1])
      filteredStatuses.push(statusOptions[2])
      if (status === "HOLD") {
        filteredStatuses.push(statusOptions[3])
      }
    }
    
    this.setState({statusOptions: filteredStatuses});
  }

  addAgency = async (e) => {
    e.preventDefault();

    const formData = {
      legalName: this.state.legalName,
      doingBusinessAs: this.state.doingBusinessAs,
      employerIdentificationNumber: filterOnlyNumbers(this.state.employerIdentificationNumber),
      licenseNumber: this.state.licenseNumber,
      licensedStates: this.state.licensedStates,
      lineOfBusiness: this.state.lineOfBusiness,
      licenseRenewalDate: this.state.licenseRenewalDate,
      corporateAddress: this.state.corporateAddress,
      corporatePhone: filterOnlyNumbers(this.state.corporatePhone),
      corporateEmail: this.state.corporateEmail,
      primaryContact: {
        email: this.state.contactPersonEmail,
        name: this.state.contactPersonName,
        phone: filterOnlyNumbers(this.state.contactPersonPhone)
      },
      primaryProducer: {
        legalFirstName: this.state.legalfirstname,
        legalLastName: this.state.legallastname,
        preferredName: this.state.superUserContactName,
        email: this.state.superUserEmail,
        nationalProducerNumber: this.state.producerNPN,
        phone: filterOnlyNumbers(this.state.producerPhoneNumber),
        licenseNumber: this.state.producerLicenseNumber,
        licensedStates: this.state.producerLicensedStates,
        lineOfBusiness: this.state.producerLinesofBusiness,
        licenseRenewalDate: this.state.producerLicenseRenewalDate,
        opraAppointed: this.state.opraappointedcheck
      },
      commissionPaymentDetails: this.state.commissionPaymentDetails,
      agencyManagementSystem: this.state.agencyManagementSystem,
      code: this.state.code,
      status: statusOptions.find(statusOption => statusOption.value === this.state.status).label.toUpperCase()
    };

    if (AgencyValidations(this.state).isValid || this.state.status === "HOLD") {
      this.props.setButtonLoading();
      if (this.state.status === "HOLD") {
        formData.primaryProducer = null;
      }

      // Agency Details
      let result = await authUtil("postData", formData, "/admin/agencies");
      if (result.status === 200) {
        this.setState({ response: "" });
        this.props.history.push("/dashboard");
      } else {
        this.setState({ response: result.data.description });
      }
      await this.props.setButtonLoading();
    } else {
      await this.setState({ errors: AgencyValidations(this.state).errors });
    }
  }

  editAgency = async (e) => {
    e.preventDefault();

    const formData = {
      legalName: this.state.legalName,
      doingBusinessAs: this.state.doingBusinessAs,
      employerIdentificationNumber: filterOnlyNumbers(this.state.employerIdentificationNumber),
      licenseNumber: this.state.licenseNumber,
      licensedStates: this.state.licensedStates,
      lineOfBusiness: this.state.lineOfBusiness,
      licenseRenewalDate: this.state.licenseRenewalDate,
      corporateAddress: this.state.corporateAddress,
      corporatePhone: filterOnlyNumbers(this.state.corporatePhone),
      corporateEmail: this.state.corporateEmail,
      primaryContact: {
        email: this.state.contactPersonEmail,
        name: this.state.contactPersonName,
        phone: filterOnlyNumbers(this.state.contactPersonPhone)
      },
      primaryProducer: {
        legalFirstName: this.state.legalfirstname,
        legalLastName: this.state.legallastname,
        preferredName: this.state.superUserContactName,
        email: this.state.superUserEmail,
        nationalProducerNumber: this.state.producerNPN,
        phone: filterOnlyNumbers(this.state.producerPhoneNumber),
        licenseNumber: this.state.producerLicenseNumber,
        licensedStates: this.state.producerLicensedStates,
        lineOfBusiness: this.state.producerLinesofBusiness,
        licenseRenewalDate: this.state.producerLicenseRenewalDate,
        opraAppointed: this.state.opraappointedcheck
      },
      commissionPaymentDetails: this.state.commissionPaymentDetails,
      agencyManagementSystem: this.state.agencyManagementSystem,
      status: statusOptions.find(statusOption => statusOption.value === this.state.status).label.toUpperCase(),
      deactivationInitiator: this.state.deactivationInitiator,
      deactivationReasonCode: this.state.deactivationReasonCode,
      deactivationComment: this.state.deactivationComment
    };

    if (AgencyValidations(this.state).isValid || this.state.status === "HOLD") {
      this.props.setButtonLoading();
      if (this.state.status === "HOLD") {
        formData.primaryProducer = null;
      }

      // Agency Details
      let result = await authUtil("updateData", formData, `/admin/agencies/${this.props.match.params.id}`);
      if (result.status === 200) {
        this.setState({ response: "" });
        this.props.history.push("/dashboard");
      } else {
        this.setState({ response: result.data.description });
      }
      await this.props.setButtonLoading();
    } else {
      await this.setState({ errors: AgencyValidations(this.state).errors });
    }
  }

  setFields = async () => {
    let result = await authUtil("getData", null, `/agencies/${this.props.match.params.id}`);
      
    if (result.status === 200) {
      if (result.data.legalName) {
        this.setState({ legalName: result.data.legalName });
      }
      if (result.data.doingBusinessAs) {
        this.setState({ doingBusinessAs: result.data.doingBusinessAs });
      }
      if (result.data.employerIdentificationNumber) {
        this.setState({ employerIdentificationNumber: setEINFormat(result.data.employerIdentificationNumber) });
      }
      if (result.data.licenseNumber) {
        this.setState({ licenseNumber: result.data.licenseNumber });
      }
      if (result.data.licensedStates) {
        this.setState({ 
          licensedStates: result.data.licensedStates,
          selectedLicensedStates: await this.setMultiSelectValues(result.data.licensedStates, countryOptions)
        });
      }
      if (result.data.lineOfBusiness) {
        this.setState({ 
          lineOfBusiness: result.data.lineOfBusiness,
          selectedLineOfBusiness: await this.setMultiSelectValues(result.data.lineOfBusiness, BusinessOptions)
        });
      }
      if (result.data.licenseRenewalDate) {
        this.setState({ licenseRenewalDate: result.data.licenseRenewalDate });
      }
      if (result.data.corporateAddress) {
        this.setState({ corporateAddress: result.data.corporateAddress });
      }
      if (result.data.corporatePhone) {
        this.setState({ corporatePhone: setPhoneFormat(result.data.corporatePhone) });
      }
      if (result.data.corporateEmail) {
        this.setState({ corporateEmail: result.data.corporateEmail });
      }
      if (result.data.primaryContact.name) {
        this.setState({ contactPersonName: result.data.primaryContact.name });
      }
      if (result.data.primaryContact.phone) {
        this.setState({ contactPersonPhone: setPhoneFormat(result.data.primaryContact.phone) });
      }
      if (result.data.primaryContact.email) {
        this.setState({ contactPersonEmail: result.data.primaryContact.email });
      }
      if (result.data.primaryProducer) {
        this.setState({ legalfirstname: result.data.primaryProducer.legalFirstName });
      }
      if (result.data.primaryProducer) {
        this.setState({ legallastname: result.data.primaryProducer.legalLastName });
      }
      if (result.data.primaryProducer) {
        this.setState({ superUserContactName: result.data.primaryProducer.preferredName });
      }
      if (result.data.primaryProducer) {
        this.setState({ superUserEmail: result.data.primaryProducer.email });
      }
      if (result.data.primaryProducer) {
        this.setState({ producerNPN: result.data.primaryProducer.nationalProducerNumber });
      }
      if (result.data.primaryProducer) {
        this.setState({ producerPhoneNumber: setPhoneFormat(result.data.primaryContact.phone) });
      }
      if (result.data.primaryProducer) {
        this.setState({ producerLicenseNumber: result.data.primaryProducer.licenseNumber });
      }
      if (result.data.primaryProducer) {
        this.setState({ 
          producerLicensedStates: result.data.primaryProducer.licensedStates,
          selectedProducerLicensedStates: await this.setMultiSelectValues(result.data.primaryProducer.licensedStates, countryOptions)
        });
      }
      if (result.data.primaryProducer) {
        this.setState({ 
          producerLinesofBusiness: result.data.primaryProducer.lineOfBusiness,
          selectedProducerLineOfBusiness: await this.setMultiSelectValues(result.data.primaryProducer.lineOfBusiness, BusinessOptions)
        });
      }
      if (result.data.primaryProducer) {
        this.setState({ producerLicenseRenewalDate: result.data.primaryProducer.licenseRenewalDate });
      }
      if (result.data.primaryProducer) {
        this.setState({ opraappointedcheck: result.data.primaryProducer.opraAppointed });
      }
      if (result.data.commissionPaymentDetails) {
        this.setState({ commissionPaymentDetails: result.data.commissionPaymentDetails });
      }
      if (result.data.agencyManagementSystem) {
        this.setState({ agencyManagementSystem: result.data.agencyManagementSystem });
      }
      if (result.data.code) {
        this.setState({ code: result.data.code });
      }
      if (result.data.status) {
        this.setState({ 
          status: result.data.status, 
          previousStatus: result.data.status 
        });
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
          <AgencyForm states={this.state} onChange={this.onChange} onSelect={this.onSelect} onDateChange={this.onDateChange} addAgency={this.addAgency} editAgency={this.editAgency} agencyId={this.props.match.params.id} handleChange={this.handleChange} setFields={this.setFields} />
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

Agency.propTypes = {
  setButtonLoading: PropTypes.func.isRequired,
  setHeaderName: PropTypes.func.isRequired
};

export default connect(
  null,
  { setButtonLoading, setHeaderName }
)(withRouter(Agency));
