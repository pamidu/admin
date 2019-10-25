import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Message from "Messages/Message";
import ProducerForm from "Components/producer/ProducerForm";
import Spinner from "Common/Spinner";

import { notification } from "Utils/ImageList";
import { setOnlyAlpha, setPhoneFormat, filterOnlyNumbers, setOnlyDigit } from "Utils/CommonUtil";

import { setHeaderName, setButtonLoading } from "Actions/globalActions";

import { authUtil } from "Utils/AuthUtil";

import AgencyList from "Common/Filters/AgencyList";
import RegionList from "Common/Filters/RegionList";
import BranchList from "Common/Filters/BranchList";
import FilterStatus from "Common/Filters/FilterStatus";

import ProducerValidations from "Components/producer/ProducerValidations";

import CountryStates from "Common/Filters/CountryStates";
import BusinessList from "Common/Filters/BusinessList";

const countryOptions = CountryStates.options;
const BusinessOptions = BusinessList.options;
const statusOptions = FilterStatus.options;

class Producer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legalfirstname: "",
      legallastname: "",
      preferredname: "",
      contactphone: "",
      contactemail: "",
      agencyId: "",
      regionId: "",
      branchId: "",
      producerNPN: "",
      producerLicenseNumber: "",
      producerLicensedStates: "",
      producerLinesofBusiness: "",
      producerLicenseRenewalDate: "",
      opraappointedcheck: false,
      code: "",
      status: "ACTIVE",
      statusOptions: [],
      isSuperProducer: false,
      defaultSuperProducer: false,
      reasoncode: null,
      comments: "",
      loading: true,
      selectedProducerLicensedStates: null,
      selectedProducerLineOfBusiness: null,
      mode: this.props.match.params.mode,
      agencyOptions: [],
      regionOptions: [],
      branchOptions: [],
      errors: [],
      response: ""
    };
  }

  componentDidMount = async () => {
    this.props.setHeaderName("/ PRODUCER");

    if (["view", "edit"].includes(this.state.mode)) {
      let selectAgencyOptions = await AgencyList(this.state.mode)
      await this.setState({
        agencyOptions: selectAgencyOptions
      });

      await this.setFields();

      let selectRegionOptions = await RegionList(this.state.agencyId, this.state.mode);
      await this.setState({
        regionOptions: selectRegionOptions
      });

      let selectBranchOptions = await BranchList(this.state.regionId, this.state.mode);
      await this.setState({
        branchOptions: selectBranchOptions
      });
    } else if (this.state.mode !== "addnew") {
      this.props.history.push("/dashboard");
    } else {
      let selectAgencyOptions = await AgencyList(this.state.mode)
      await this.setState({
        agencyOptions: selectAgencyOptions,
        agencyId: selectAgencyOptions[0].value
      });

      let selectRegionOptions = await RegionList(this.state.agencyId, this.state.mode);
      await this.setState({
        regionOptions: selectRegionOptions,
        regionId: selectRegionOptions[0].value
      });

      let selectBranchOptions = await BranchList(this.state.regionId, this.state.mode);
      await this.setState({
        branchOptions: selectBranchOptions,
        branchId: selectBranchOptions[0].value
      });
    }

    await this.filterStatus(this.state.mode, this.state.status);

    await this.setState({ loading: false });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.mode !== prevProps.match.params.mode) {
      this.setState({ mode: this.props.match.params.mode })
    }
  }

  onChange = (e) => {
    let val;

    if (["contactphone"].includes(e.target.name)) {
      val = setPhoneFormat(e.target.value);
    } else if (["legalfirstname", "legallastname"].includes(e.target.name)) {
      val = setOnlyAlpha(e.target.value);
    } else if (["producerNPN", "producerLicenseNumber"].includes(e.target.name)) {
      val = setOnlyDigit(e.target.value);
    } else if (["agencyId"].includes(e.target.name)) {
      this.updateRegionOptions(e.target.value);
      val = e.target.value;
    } else if (["regionId"].includes(e.target.name)) {
      this.updateBranchOptions(e.target.value);
      val = e.target.value;
    } else {
      val = e.target.value;
    }

    this.setState({ [e.target.id]: val });
    delete this.state.errors[e.target.id];
    this.setState({ response: '' });
  }

  updateRegionOptions = async (agencyId) => {
    let selectRegionOptions = await RegionList(agencyId, this.state.mode);
    this.setState({
      regionOptions: selectRegionOptions,
      regionId: selectRegionOptions[0].value
    });

    let selectBranchOptions = await BranchList(selectRegionOptions[0].value, this.state.mode);
    this.setState({
      branchOptions: selectBranchOptions,
      branchId: selectBranchOptions[0].value
    });
  }

  updateBranchOptions = async (regionId) => {
    let selectBranchOptions = await BranchList(regionId, this.state.mode);
    this.setState({
      branchOptions: selectBranchOptions,
      branchId: selectBranchOptions[0].value
    });
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

    if (e.name === "producerLicensedStates") {
      await this.setState({
        selectedProducerLicensedStates: selectedOption,
      });
    } else {
      await this.setState({
        selectedProducerLineOfBusiness: selectedOption,
      });
    }

    for (let x in selectedOption) {
      selectedItems.push(selectedOption[x].value);
    }

    await this.setState({
      [e.name]: selectedItems.join(", "),
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

    this.setState({ statusOptions: filteredStatuses });
  }

  addProducer = async (e) => {
    e.preventDefault();

    const formData = {
      email: this.state.contactemail,
      legalFirstName: this.state.legalfirstname,
      legalLastName: this.state.legallastname,
      licenseNumber: this.state.producerLicenseNumber,
      licenseRenewalDate: this.state.producerLicenseRenewalDate,
      licensedStates: this.state.producerLicensedStates,
      lineOfBusiness: this.state.producerLinesofBusiness,
      nationalProducerNumber: this.state.producerNPN,
      opraAppointed: this.state.opraappointedcheck,
      phone: filterOnlyNumbers(this.state.contactphone),
      preferredName: this.state.preferredname,
      role: this.state.isSuperProducer === true ? "SUPER_PRODUCER" : "PRODUCER",
      status: this.state.status,
      primaryProducer: false


      // legalFirstName: this.state.legalfirstname,
      // legalLastName: this.state.legallastname,
      // preferredName: this.state.preferredname,
      // contactPhone: filterOnlyNumbers(this.state.contactphone),
      // contactEmail: this.state.contactemail,
      // agencyId: this.state.agencyId,
      // regionId: this.state.regionId,
      // branchId: this.state.branchId,
      // nationalProducerNumber: this.state.producerNPN,
      // licenseNumbers: this.state.producerLicenseNumber,
      // licensedStates: this.state.producerLicensedStates,
      // lineOfBusiness: this.state.producerLinesofBusiness,
      // licenseRenewalDate: this.state.producerLicenseRenewalDate,
      // opraAppointed: this.state.opraappointedcheck,
      // status: this.state.status,
      // superProducer: this.state.isSuperProducer
    };

    if (ProducerValidations(this.state).isValid || this.state.status === "HOLD") {
      this.props.setButtonLoading();

      // Producer Details
      let result = await authUtil("postData", formData, `/admin/agencies/${this.state.agencyId}/regions/${this.state.regionId}/branches/${this.state.branchId}/producers`);
      if (result.status === 200) {
        this.setState({ response: "" });
        this.props.history.push("/dashboard");
      } else {
        this.setState({ response: result.data.description });
      }
      await this.props.setButtonLoading();
    } else {
      await this.setState({ errors: ProducerValidations(this.state).errors });
    }
  }

  editProducer = async (e) => {
    e.preventDefault();

    const formData = {
      legalFirstName: this.state.legalfirstname,
      legalLastName: this.state.legallastname,
      licenseNumber: this.state.producerLicenseNumber,
      licenseRenewalDate: this.state.producerLicenseRenewalDate,
      licensedStates: this.state.producerLicensedStates,
      lineOfBusiness: this.state.producerLinesofBusiness,
      nationalProducerNumber: this.state.producerNPN,
      opraAppointed: this.state.opraappointedcheck,
      phone: filterOnlyNumbers(this.state.contactphone),
      preferredName: this.state.preferredname,
      role: this.state.isSuperProducer === true ? "SUPER_PRODUCER" : "PRODUCER",
      status: this.state.status,

      // legalFirstName: this.state.legalfirstname,
      // legalLastName: this.state.legallastname,
      // preferredName: this.state.preferredname,
      // contactPhone: filterOnlyNumbers(this.state.contactphone),
      // contactEmail: this.state.contactemail,
      // regionId: this.state.regionId,
      // branchId: this.state.branchId,
      // nationalProducerNumber: this.state.producerNPN,
      // licenseNumbers: this.state.producerLicenseNumber,
      // licensedStates: this.state.producerLicensedStates,
      // lineOfBusiness: this.state.producerLinesofBusiness,
      // licenseRenewalDate: this.state.producerLicenseRenewalDate,
      // opraAppointed: this.state.opraappointedcheck,
      // status: this.state.status,
      // superProducer: this.state.isSuperProducer
    };

    if (ProducerValidations(this.state).isValid || this.state.status === "HOLD") {
      this.props.setButtonLoading();

      // Agency Details
      let result = await authUtil("updateData", formData, `/admin/agencies/${this.props.match.params.agencyId}/regions/${this.props.match.params.regionId}/branches/${this.props.match.params.branchId}/producers/${this.props.match.params.id}`);
      if (result.status === 200) {
        this.setState({ response: "" });
        this.props.history.push("/dashboard");
      } else {
        this.setState({ response: result.data.description });
      }
      await this.props.setButtonLoading();
    } else {
      await this.setState({ errors: ProducerValidations(this.state).errors });
    }
  }

  setFields = async () => {
    let result = await authUtil("getData", null, `/agencies/${this.props.match.params.agencyId}/regions/${this.props.match.params.regionId}/branches/${this.props.match.params.branchId}/producers/${this.props.match.params.id}`);

    if (result.status === 200) {
      if (result.data.legalFirstName) {
        this.setState({ legalfirstname: result.data.legalFirstName });
      }
      if (result.data.legalLastName) {
        this.setState({ legallastname: result.data.legalLastName });
      }
      if (result.data.preferredName) {
        this.setState({ preferredname: result.data.preferredName });
      }
      if (result.data.phone) {
        this.setState({ contactphone: setPhoneFormat(result.data.phone) });
      }
      if (result.data.email) {
        this.setState({ contactemail: result.data.email });
      }
      if (result.data.agencyId) {
        this.setState({ agencyId: result.data.agencyId });
      }
      if (result.data.regionId) {
        this.setState({ regionId: result.data.regionId });
      }
      if (result.data.branchId) {
        this.setState({ branchId: result.data.branchId });
      }
      if (result.data.nationalProducerNumber) {
        this.setState({ producerNPN: result.data.nationalProducerNumber });
      }
      if (result.data.licenseNumber) {
        this.setState({ producerLicenseNumber: result.data.licenseNumber });
      }
      if (result.data.licensedStates) {
        this.setState({
          producerLicensedStates: result.data.licensedStates,
          selectedProducerLicensedStates: await this.setMultiSelectValues(result.data.licensedStates, countryOptions)
        });
      }
      if (result.data.lineOfBusiness) {
        this.setState({
          producerLinesofBusiness: result.data.lineOfBusiness,
          selectedProducerLineOfBusiness: await this.setMultiSelectValues(result.data.lineOfBusiness, BusinessOptions)
        });
      }
      if (result.data.licenseRenewalDate) {
        this.setState({ producerLicenseRenewalDate: result.data.licenseRenewalDate });
      }
      if (result.data.opraAppointed) {
        this.setState({ opraappointedcheck: result.data.opraAppointed });
      }
      if (result.data.code) {
        this.setState({ code: result.data.code });
      }
      if (result.data.status) {
        this.setState({ status: result.data.status });
      }
      if (result.data.role === "SUPER_PRODUCER") {
        this.setState({ isSuperProducer: true });
      }
      if (result.data.primaryProducer) {
        this.setState({ defaultSuperProducer: result.data.primaryProducer });
      }
    } else {
      this.setState({ response: result.data.description });
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
          <ProducerForm states={this.state} onChange={this.onChange} onSelect={this.onSelect} addProducer={this.addProducer} editProducer={this.editProducer} agencyId={this.props.match.params.agencyId} regionId={this.props.match.params.regionId} branchId={this.props.match.params.branchId} producerId={this.props.match.params.id} handleChange={this.handleChange} onDateChange={this.onDateChange} setFields={this.setFields} />
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

Producer.propTypes = {
  setHeaderName: PropTypes.func.isRequired,
  setButtonLoading: PropTypes.func.isRequired,
};

export default connect(
  null,
  { setHeaderName, setButtonLoading }
)(withRouter(Producer));
