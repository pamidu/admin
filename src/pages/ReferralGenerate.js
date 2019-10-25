import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "Common/Spinner";
import Message from "Messages/Message";

import SelectFieldInput from "FormFields/SelectFieldInput";
import TextFieldInput from "FormFields/TextFieldInput";
import FilterCategory from "Common/Filters/FilterCategory";
import ReferralList from "Common/Filters/ReferralList";
import AgencyList from "Common/Filters/AgencyList";
import RegionList from "Common/Filters/RegionList";
import BranchList from "Common/Filters/BranchList";
import ProducerList from "Common/Filters/ProducerList";
import ReferralGeneratedDatatable from "../components/datatable/ReferralGeneratedDatatable";
import { setHeaderName } from "Actions/globalActions";
import { authUtil } from "Utils/AuthUtil";
import { isEmpty } from "Utils/CommonUtil";
import { notification } from "Utils/ImageList";


const categoryOptions = FilterCategory.options;
const referralOptions = ReferralList.options;

class ReferralGenerate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      owner: "AGENCY",
      landingScreen: "NONE",
      agencyId: "",
      regionId: "",
      branchId: "",
      producerId: "",
      name: "",
      agencyOptions: [],
      regionOptions: [],
      branchOptions: [],
      producerOptions: [],
      regionReadOnly: true,
      branchReadOnly: true,
      producerReadOnly: true,
      data: [],
      errors: [],
      response: "",
      datatable: null
    };
  }

  componentDidMount = async () => {
    this.props.setHeaderName(" / REFERRAL GENERATOR");

    let selectAgencyOptions = await AgencyList()
    this.setState({
      agencyOptions: selectAgencyOptions,
      agencyId: selectAgencyOptions[0].value
    });

    let selectRegionOptions = await RegionList(this.state.agencyId);
    this.setState({
      regionOptions: selectRegionOptions,
      regionId: selectRegionOptions[0].value
    });

    let selectBranchOptions = await BranchList(this.state.regionId);
    this.setState({
      branchOptions: selectBranchOptions,
      branchId: selectBranchOptions[0].value
    });

    let selectProducerOptions = await ProducerList(this.state.branchId);
    this.setState({
      producerOptions: selectProducerOptions,
      producerId: selectProducerOptions[0].value
    });

    this.loadTable(this.state.data);
    await this.setState({ loading: false });
  }

  onCategoryChange = (category) => {
    switch (category) {
      case "AGENCY":
        this.setState({
          regionReadOnly: true,
          branchReadOnly: true,
          producerReadOnly: true
        })
        break;
      case "REGION":
        this.setState({
          regionReadOnly: false,
          branchReadOnly: true,
          producerReadOnly: true
        })
        break;
      case "BRANCH":
        this.setState({
          regionReadOnly: false,
          branchReadOnly: false,
          producerReadOnly: true
        })
        break;
      case "PRODUCER":
        this.setState({
          regionReadOnly: false,
          branchReadOnly: false,
          producerReadOnly: false
        })
        break;
    }
  }

  onChange = (e) => {
    let val;

    if (["owner"].includes(e.target.name)) {
      this.onCategoryChange(e.target.value);
      val = e.target.value;
    } else if (["agencyId"].includes(e.target.name)) {
      this.updateRegionOptions(e.target.value);
      val = e.target.value;
    } else if (["regionId"].includes(e.target.name)) {
      this.updateBranchOptions(e.target.value);
      val = e.target.value;
    } else if (["branchId"].includes(e.target.name)) {
      this.updateProducerOptions(e.target.value);
      val = e.target.value;
    } else if (["producerId"].includes(e.target.name)) {
      val = e.target.value;
    } else if (["name"].includes(e.target.name)) {
      val = e.target.value;
    } else {
      val = e.target.value;
    }


    this.setState({ [e.target.id]: val });
    delete this.state.errors[e.target.id];
    this.setState({ response: '' });
  }

  updateRegionOptions = async (agencyId) => {
    let selectRegionOptions = await RegionList(agencyId);
    this.setState({
      regionOptions: selectRegionOptions,
      regionId: selectRegionOptions[0].value
    });

    let selectBranchOptions = await BranchList(selectRegionOptions[0].value);
    this.setState({
      branchOptions: selectBranchOptions,
      branchId: selectBranchOptions[0].value
    });

    let selectProducerOptions = await ProducerList(selectBranchOptions[0].value);
    this.setState({
      producerOptions: selectProducerOptions,
      producerId: selectProducerOptions[0].value
    });
  }

  updateBranchOptions = async (regionId) => {
    let selectBranchOptions = await BranchList(regionId);
    this.setState({
      branchOptions: selectBranchOptions,
      branchId: selectBranchOptions[0].value
    });

    let selectProducerOptions = await ProducerList(selectBranchOptions[0].value);
    this.setState({
      producerOptions: selectProducerOptions,
      producerId: selectProducerOptions[0].value
    });
  }

  updateProducerOptions = async (branchId) => {
    let selectProducerOptions = await ProducerList(branchId);
    this.setState({
      producerOptions: selectProducerOptions,
      producerId: selectProducerOptions[0].value
    });
  }

  generateReferralURL = async (e) => {
    e.preventDefault();

    const formData = {
      owner: this.state.owner,
      landingScreen: this.state.landingScreen,
      agencyId: this.state.agencyId,
      regionId: this.state.regionId,
      branchId: this.state.branchId,
      producerId: this.state.producerId,
      name: this.state.name
    }

    if (!isEmpty(this.state.name)) {
      let result = await authUtil("postData", formData, `/admin/referralurls`);
      if (result.status === 200) {
        this.setState({ name: '' })
        this.submit("all");
      } else {
        this.setState({ data: [] })
        this.setState({ response: result.data.description });
      };
    } else {
      await this.setState({ errors: { "name": "Referral name required." } });
    }
  }

  submit = async (filterStatus) => {
    let filterPath = "";

    if (this.state.owner === "PRODUCER") {
      filterPath = `&region-id=${this.state.regionId}&branch-id=${this.state.branchId}&producer-id=${this.state.producerId}`;
    } else if (this.state.owner === "BRANCH") {
      filterPath = `&region-id=${this.state.regionId}&branch-id=${this.state.branchId}`;
    } else if (this.state.owner === "REGION") {
      filterPath = `&region-id=${this.state.regionId}`;
    }

    let result;

    if (filterStatus === "all") {
      result = await authUtil("getData", null, `/referralurls`);
    } else {
      result = await authUtil("getData", null, `/referralurls?owner=${this.state.owner}&prescreener=${this.state.landingScreen}&agency-id=${this.state.agencyId}${filterPath}`);
    }

    if (result.status === 200) {
      this.setState({ data: result.data });
      this.loadTable(this.state.data);
    } else {
      this.setState({ data: [] })
      this.setState({ response: result.data.description });
    };
  }

  loadTable = async (data = []) => {
    this.setState({ datatable: <ReferralGeneratedDatatable data={data} /> });
  }

  render = () => {
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
          <div className="flex flex-row w-3/5 py-6">
            <div className="flex-col w-1/3">
              <div className="pb-2">Assign to</div>
              <SelectFieldInput
                id="owner"
                name="owner"
                onChange={this.onChange}
                options={categoryOptions}
                customStyle="w-full"
                containerStyle="flex flex-row"
                selected={this.state.owner}
              />
            </div>
            <div className="flex-col w-1/3 ml-4">
              <div className="pb-2">URL Landing Page</div>
              <SelectFieldInput
                id="landingScreen"
                name="landingScreen"
                onChange={this.onChange}
                options={referralOptions}
                customStyle="w-full"
                containerStyle="flex flex-row"
                selected={this.state.landingScreen}
              />
            </div>
          </div>
          <section>
            <div id="selections" className="flex flex-row py-6">
              <div className="flex-col w-1/3">
                <div className="pb-2">Agency</div>
                <SelectFieldInput
                  id="agencyId"
                  name="agencyId"
                  onChange={this.onChange}
                  options={this.state.agencyOptions}
                  customStyle="w-full"
                  containerStyle="flex flex-row"
                  selected={this.state.agencyId}
                />
              </div>
              <div className="flex-col w-1/3 ml-4">
                <div className="pb-2">Region</div>
                <SelectFieldInput
                  id="regionId"
                  name="regionId"
                  onChange={this.onChange}
                  options={this.state.regionOptions}
                  customStyle="w-full"
                  containerStyle="flex flex-row"
                  selected={this.state.regionId}
                  disabled={this.state.regionReadOnly}
                />
              </div>
              <div className="flex-col w-1/3 ml-4">
                <div className="pb-2">Branch</div>
                <SelectFieldInput
                  id="branchId"
                  name="branchId"
                  onChange={this.onChange}
                  options={this.state.branchOptions}
                  customStyle="w-full"
                  containerStyle="flex flex-row"
                  selected={this.state.branchId}
                  disabled={this.state.branchReadOnly}
                />
              </div>
              <div className="flex-col w-1/3 ml-4">
                <div className="pb-2">Producer</div>
                <SelectFieldInput
                  id="producerId"
                  name="producerId"
                  onChange={this.onChange}
                  options={this.state.producerOptions}
                  customStyle="w-full"
                  containerStyle="flex flex-row"
                  selected={this.state.producerId}
                  disabled={this.state.producerReadOnly}
                />
              </div>
            </div>
            <div className="flex flex-row py-6">
              <div className="flex-col">
                <TextFieldInput
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Referral Name"
                  onChange={this.onChange}
                  customStyle="w-full"
                  containerStyle="flex flex-row"
                  value={this.state.name}
                  error={this.state.errors.name}
                />
              </div>
              <div className="flex-col ml-4 mt-1">
                {!isEmpty(this.state.name) ?
                  <button onClick={this.generateReferralURL} className="text-white font-bold md:text-lg lg:text-lg bg-btn-primary hover:bg-btn-primary-hover px-4 py-2 rounded-full w-full">
                    Generate Referral URLs
                  </button>
                  :
                  <button onClick={this.generateReferralURL} className="text-white font-bold md:text-lg lg:text-lg px-4 py-2 rounded-full disabled">
                    Generate Referral URLs
                  </button>
                }
              </div>
              <div className="flex-col ml-4 mt-1">
                <button onClick={() => this.submit("filtered")} className="text-black font-bold md:text-lg lg:text-lg bg-btn-secondary hover:bg-btn-secondary-hover px-4 py-2 rounded-full">
                  Load Filtered URLs
                </button>
              </div>
              <div className="flex-col ml-4 mt-1">
                <button onClick={() => this.submit("all")} className="text-black font-bold md:text-lg lg:text-lg bg-btn-secondary hover:bg-btn-secondary-hover px-4 py-2 rounded-full">
                  Load All URLs
                </button>
              </div>
            </div>
          </section>
          <div id="results" className="mt-4">
            <div className="flex items-end pb-2">
              <div className="flex-none">Generated Referral URL's</div>
            </div>
            <div className="float-none">
              {this.state.datatable}
            </div>
          </div>
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

ReferralGenerate.propTypes = {
  setHeaderName: PropTypes.func.isRequired,
  global: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  global: state.global
});

export default connect(
  mapStateToProps,
  { setHeaderName }
)(withRouter(ReferralGenerate));
