import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";

import ButtonField from "FormFields/ButtonField";
import TextFieldInput from "FormFields/TextFieldInput";
import SelectFieldInput from "FormFields/SelectFieldInput";
import FilterStatus from "Common/Filters/FilterStatus";


const statusOptions = FilterStatus.options;

class RegionForm extends Component {
  isReadOnly () {
    return this.props.states.mode === "view";
  }

  componentDidUpdate(prevProps) {
    if(prevProps.states.mode!==this.props.states.mode){
      this.props.setFields();
    }
  }

  render() {
    return (
      <div className="py-6">
        <h3>{this.props.states.mode === "addnew" ? "Add Region" : this.props.states.mode === "edit" ? "Edit Region" : "View Region"}</h3>
        <div className="w-4/5">
          <form className="text-base">
            <section className="pb-8">
              <div className="flex flex-row py-2 items-center">
                <div className="flex w-1/3 pr-4">Name*</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder="string"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.name}
                    error={this.props.states.errors.name}
                    readonly={this.isReadOnly()}
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-center">
                <div className="flex w-1/3 pr-4">Agency*</div>
                <div className="flex-1 w-2/3">
                  <SelectFieldInput
                    id="agencyId"
                    name="agencyId"
                    onChange={this.props.onChange}
                    options={this.props.states.agencyOptions}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    selected={this.props.states.agencyId}
                    disabled={this.isReadOnly() || this.props.states.mode === "edit"}
                  /></div>
              </div>
              {this.props.states.mode !== "addnew" &&
                <div>
                  <div className="flex flex-row py-2 items-center">
                    <div className="flex w-1/3 pr-4">Code*</div>
                    <div className="flex-1 w-2/3">
                      <TextFieldInput
                        id="code"
                        name="code"
                        type="text"
                        placeholder="Auto-gen/read-only. unique within agency, format XXX; 123"
                        onChange={this.props.onChange}
                        customStyle="w-full"
                        containerStyle="flex flex-row"
                        value={this.props.states.code}
                        disabled="disabled"
                      /></div>
                  </div>
                  <div className="flex flex-row py-2 items-center">
                    <div className="flex w-1/3 pr-4">Status</div>
                    <div className="flex-1 w-2/3">
                      <SelectFieldInput
                        id="status"
                        name="status"
                        onChange={this.props.onChange}
                        options={statusOptions.slice(1, 3)}
                        customStyle="w-full"
                        containerStyle="flex flex-row"
                        selected={this.props.states.status}
                        disabled={this.isReadOnly()}
                      /></div>
                  </div>
                </div>
              }
            </section>
            <section>
              <div className="text-center mt-6">
                {!this.isReadOnly() ?
                  (this.props.states.mode === "edit" ?
                    <ButtonField
                    id="submit"
                    name="submit"
                    value="Save"
                    customStyle="text-white font-bold md:text-xl lg:text-xl bg-btn-primary hover:bg-btn-primary-hover px-4 py-2 rounded-full w-1/5 "
                    onClick={this.props.editRegion}
                  />
                  : <ButtonField
                    id="submit"
                    name="submit"
                    value="Submit"
                    customStyle="text-white font-bold md:text-xl lg:text-xl bg-btn-primary hover:bg-btn-primary-hover px-4 py-2 rounded-full w-1/5 "
                    onClick={this.props.addRegion}
                  />)
                  :
                  <ButtonField
                    id="submit"
                    name="submit"
                    value="Edit"
                    customStyle="text-white font-bold md:text-xl lg:text-xl bg-btn-primary hover:bg-btn-primary-hover px-4 py-2 rounded-full w-1/5 "
                    onClick={(e) => {e.preventDefault(); this.props.history.push(`/region/edit/${this.props.agencyId}/${this.props.regionId}`)}}
                  />
                }
                <div className="mt-4"><Link to="/dashboard">Cancel</Link></div>
              </div>
            </section>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(RegionForm);
