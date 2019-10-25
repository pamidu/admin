import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "Common/Spinner";

import SelectFieldInput from "FormFields/SelectFieldInput";
import FilterCategory from "Common/Filters/FilterCategory";
import FilterStatus from "Common/Filters/FilterStatus";
import AgencyDatatable from "../components/datatable/AgencyDatatable";
import BranchDatatable from "../components/datatable/BranchDatatable";
import RegionDatatable from "../components/datatable/RegionDatatable";
import ProducerDatatable from "../components/datatable/ProducerDatatable";
import { setHeaderName, setSearchParams, setPageNumber } from "Actions/globalActions";
import { authUtil } from "Utils/AuthUtil";

const options = FilterCategory.options;
const statusOptions = FilterStatus.options;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.global.category,
      status: this.props.global.status,
      tableName: "Agency Results",
      loading: true,
      data: [],
      errors: [],
      datatable: null
    };
  }

  componentDidMount = async () => {
    this.props.setHeaderName(" / DASHBOARD");

    this.submit();

    await this.setState({ loading: false });
  }

  // componentDidUpdate(prevProps) {
  //   if(prevProps.data!==this.state.data){
  //     this.setState({data: []});
  //   }
  // }

  onChange = (e) => {
    let val;

    if (["category"].includes(e.target.name) && this.state.status === "HOLD") {
      this.setState({ status: "NONE" });
    }

    val = e.target.value;

    this.setState({
      [e.target.id]: val,
      tableName: "Results"
    });
    this.loadTable([]);
    delete this.state.errors[e.target.name];
  }

  addNew = () => {
    switch (this.state.category) {
      case "AGENCY":
        this.props.history.push('/agency/addnew');
        break;
      case "REGION":
        this.props.history.push('/region/addnew');
        break;
      case "BRANCH":
        this.props.history.push('/branch/addnew');
        break;
      case "PRODUCER":
        this.props.history.push('/producer/addnew');
        break;
    }
  }

  submit = async () => {
    this.props.setSearchParams(this.state.category, this.state.status);

    this.props.setPageNumber(0);

    let categoryOption, statusOption;

    switch (this.state.category) {
      case "AGENCY":
        this.setState({tableName: "Agency Results"});
        categoryOption = "/agencies";
        break;
      case "REGION":
        this.setState({tableName: "Region Results"});
        categoryOption = "/regions";
        break;
      case "BRANCH":
        this.setState({tableName: "Branch Results"});
        categoryOption = "/branches";
        break;
      case "PRODUCER":
        this.setState({tableName: "Producer Results"});
        categoryOption = "/producers";
        break;
    }

    switch (this.state.status) {
      case "NONE":
        statusOption = "";
        break;
      case "ACTIVE":
        statusOption = "ACTIVE"
        break;
      case "INACTIVE":
        statusOption = "INACTIVE"
        break;
      case "HOLD":
        statusOption = "HOLD";
        break;
    }

    let result = await authUtil("getData", null, `${categoryOption}?status=${statusOption}`);

    if (result.status === 200) {
      this.setState({ data: result.data });
    } else {
      this.setState({ data: [] })
      console.log("Retrieve Fail")
    };

    this.loadTable(this.state.data);
  }

  loadTable = async (data = []) => {
    switch (this.state.category) {
      case "AGENCY":
        this.setState({ datatable: <AgencyDatatable category={this.state.category} data={data} /> });
        break;
      case "REGION":
        this.setState({ datatable: <RegionDatatable category={this.state.category} data={data} /> });
        break;
      case "BRANCH":
        this.setState({ datatable: <BranchDatatable category={this.state.category} data={data} /> });
        break;
      case "PRODUCER":
        this.setState({ datatable: <ProducerDatatable category={this.state.category} data={data} /> });
        break;
    }
  }

  render = () => {
    let filteredStatusOptions;

    switch (this.state.category) {
      case "AGENCY":
        filteredStatusOptions = statusOptions;
        break;
      case "REGION":
        filteredStatusOptions = statusOptions.slice(0, 3);
        break;
      case "BRANCH":
        filteredStatusOptions = statusOptions.slice(0, 3);
        break;
      case "PRODUCER":
        filteredStatusOptions = statusOptions;
        break;
    }

    let content;

    if (this.state.loading) {
      content = <Spinner />;
    } else {
      content = (
        <div className="container mx-auto px-8 pb-4 lg:px-24 lg:pb-8">
          <div id="filters" className="flex flex-row w-3/5 py-6">
            <div className="flex-col w-1/3">
              <div className="pb-2">Filter by</div>
              <SelectFieldInput
                id="category"
                name="category"
                onChange={this.onChange}
                options={options}
                customStyle="w-full"
                containerStyle="flex flex-row"
                selected={this.state.category}
              />
            </div>
            <div className="flex-col w-1/3 ml-4">
              <div className="pb-2">and by status</div>
              <SelectFieldInput
                id="status"
                name="status"
                onChange={this.onChange}
                options={filteredStatusOptions}
                customStyle="w-full"
                containerStyle="flex flex-row"
                selected={this.state.status}
              />
            </div>
            <div className="flex-col w-1/3 ml-4 mt-0">
              <button onClick={this.submit} className="text-white font-bold md:text-lg lg:text-lg bg-btn-primary hover:bg-btn-primary-hover px-4 py-2 rounded-full w-3/5 mt-8">
                Search
              </button>
            </div>
          </div>
          <div id="results" className="mt-4">
            <div className="flex items-end pb-2">
              <div className="flex-none">{this.state.tableName}</div>
              <div className="flex-1 text-right">
                <button onClick={this.addNew} className="text-black font-bold md:text-lg lg:text-lg bg-btn-secondary hover:bg-btn-secondary-hover px-4 py-2 rounded-full w-36">Add New</button>
              </div>
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

Dashboard.propTypes = {
  setHeaderName: PropTypes.func.isRequired,
  setSearchParams: PropTypes.func.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  global: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  global: state.global
});

export default connect(
  mapStateToProps,
  { setHeaderName, setSearchParams, setPageNumber }
)(withRouter(Dashboard));