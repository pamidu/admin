import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import RegionForm from "Components/region/RegionForm";
import Message from "Messages/Message";
import Spinner from "Common/Spinner";

import FilterStatus from "Common/Filters/FilterStatus";
import AgencyList from "Common/Filters/AgencyList";

import { setButtonLoading } from "Actions/globalActions";
import { setHeaderName } from "Actions/globalActions";

import { authUtil } from "Utils/AuthUtil";
import { notification } from "Utils/ImageList";

import RegionValidations from "Components/region/RegionValidations";

const statusOptions = FilterStatus.options;

class Region extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      agencyId: '',
      code: '',
      status: 'ACTIVE',
      mode: this.props.match.params.mode,
      data: [],
      agencyOptions: [],
      response: '',
      loading: true,
      errors: [],
    };
  }

  componentDidMount = async () => {
    this.props.setHeaderName("/ REGION");

    let selectAgencyOptions = await AgencyList(this.state.mode)
    this.setState({
      agencyOptions: selectAgencyOptions,
      agencyId: selectAgencyOptions[0].value
    });

    if (["view", "edit"].includes(this.state.mode)) {
      await this.setFields();
    } else if (this.state.mode !== "addnew") {
      this.props.history.push("/dashboard");
    }

    await this.setState({loading: false});
  }

  componentDidUpdate(prevProps) {
    if(this.props.match.params.mode !== prevProps.match.params.mode) 
    {
      this.setState({mode: this.props.match.params.mode})
    }
  } 

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    delete this.state.errors[e.target.name];
  }

  onSelect = (e) => {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
    delete this.state.errors[e.target.id];
  }

  editRegion = async (e) => {
    e.preventDefault();

    const formData = {
      name: this.state.name,
      status: statusOptions.find(statusOption => statusOption.value === this.state.status).label.toUpperCase()
    };

    if (RegionValidations(this.state).isValid) {
      this.props.setButtonLoading();

      // Region Details
      let result = await authUtil("updateData", formData, `/admin/agencies/${this.props.match.params.agencyId}/regions/${this.props.match.params.id}`);
      if (result.status === 200) {
        this.setState({ response: "" });
        this.props.history.push("/dashboard");
      } else {
        this.setState({ response: result.data.description });
      }
      await this.props.setButtonLoading();
    } else {
      await this.setState({ errors: RegionValidations(this.state).errors });
    }
  }

  addRegion = async (e) => {
    e.preventDefault();

    const formData = {
      name: this.state.name
    };

    if (RegionValidations(this.state).isValid) {
      this.props.setButtonLoading();

      // Region Details
      let result = await authUtil("postData", formData, `/admin/agencies/${this.state.agencyId}/regions`);
      if (result.status === 200) {
        this.setState({ response: "" });
        this.props.history.push("/dashboard");
      } else {
        this.setState({ response: result.data.description });
      }
      await this.props.setButtonLoading();
    } else {
      await this.setState({ errors: RegionValidations(this.state).errors });
    }
  }

  setFields = async () => {
    let result = await authUtil("getData", null, `/agencies/${this.props.match.params.agencyId}/regions/${this.props.match.params.id}`);
    
    if (result.status === 200) {
      if (result.data.name) {
        this.setState({name: result.data.name});
      }
      if (result.data.agencyId) {
        this.setState({agencyId: result.data.agencyId});
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
          <RegionForm states={this.state} onChange={this.onChange} onSelect={this.onSelect} addRegion={this.addRegion} editRegion={this.editRegion} agencyId={this.props.match.params.agencyId} regionId={this.props.match.params.id} setFields={this.setFields} />
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

Region.propTypes = {
  setButtonLoading: PropTypes.func.isRequired,
  setHeaderName: PropTypes.func.isRequired
};

export default connect(
  null,
  { setButtonLoading, setHeaderName }
)(withRouter(Region));
