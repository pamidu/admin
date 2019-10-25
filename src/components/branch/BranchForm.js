import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import TextFieldInput from "FormFields/TextFieldInput";
import SelectFieldInput from "FormFields/SelectFieldInput";
import FilterStatus from "Common/Filters/FilterStatus";
import ButtonField from "FormFields/ButtonField";

const statusOptions = FilterStatus.options;

class BranchForm extends Component {
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
      <h3>{this.props.states.mode === "addnew" ? "Add Branch" : this.props.states.mode === "edit" ? "Edit Branch" : "View Branch" }</h3>          
        <div className="w-4/5">
          <form className="text-base">
            <section className="pb-8">
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Name*</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder="string (Branch Name)"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.name}
                    error={this.props.states.errors.name}
                    readonly={this.isReadOnly()}
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
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
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Region*</div>
                <div className="flex-1 w-2/3">
                  <SelectFieldInput
                    id="regionId"
                    name="regionId"
                    onChange={this.props.onChange}
                    options={this.props.states.regionOptions}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    selected={this.props.states.regionId}
                    disabled={this.isReadOnly()}
                  /></div>
              </div>
            </section>
            <section className="py-8">
              <span className="text-lg font-semibold">Contact Details</span>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Branch Address</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="branchaddress"
                    name="branchaddress"
                    type="text"
                    placeholder="string (200 Brookline Ave, Boston, MA)"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.branchaddress}
                    error={this.props.states.errors.branchaddress}
                    readonly={this.isReadOnly()}
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Branch Phone</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="branchphone"
                    name="branchphone"
                    type="text"
                    placeholder="string (023 322-1233)"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.branchphone}
                    error={this.props.states.errors.branchphone}
                    readonly={this.isReadOnly()}
                    maxLength='14'
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Branch Email</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="branchemail"
                    name="branchemail"
                    type="text"
                    placeholder="string (abc@mail.com)"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.branchemail}
                    error={this.props.states.errors.branchemail}
                    readonly={this.isReadOnly()}
                    maxLength="50"
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Contact Person's Name</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="contactname"
                    name="contactname"
                    type="text"
                    placeholder="string (Johnny)"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.contactname}
                    error={this.props.states.errors.contactname}
                    readonly={this.isReadOnly()}
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Contact Person's Phone</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="contactphone"
                    name="contactphone"
                    type="text"
                    placeholder="string (343 324-3244)"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.contactphone}
                    error={this.props.states.errors.contactphone}
                    readonly={this.isReadOnly()}
                    maxLength='14'
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Contact Person's Email</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="contactemail"
                    name="contactemail"
                    type="text"
                    placeholder="string (abc@email.com)"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.contactemail}
                    error={this.props.states.errors.contactemail}
                    readonly={this.isReadOnly()}
                    maxLength="50"
                  /></div>
              </div>
            </section>
            <section className="py-8">
              {this.props.states.mode !== "addnew" &&
                <div className="flex flex-row py-2 items-baseline">
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
              }
              {this.props.states.mode !== "addnew" &&
                <div className="flex flex-row py-2 items-baseline">
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
              }
            </section>
            <section>
              <div className="text-center p-4 mt-4">
                {!this.isReadOnly() ?
                  (this.props.states.mode === "edit" ?
                    <ButtonField
                    id="submit"
                    name="submit"
                    value="Save"
                    customStyle="text-white font-bold md:text-xl lg:text-xl bg-btn-primary hover:bg-btn-primary-hover px-4 py-2 rounded-full w-1/5 "
                    onClick={this.props.editBranch}
                  />
                  : <ButtonField
                    id="submit"
                    name="submit"
                    value="Submit"
                    customStyle="text-white font-bold md:text-xl lg:text-xl bg-btn-primary hover:bg-btn-primary-hover px-4 py-2 rounded-full w-1/5 "
                    onClick={this.props.addBranch}
                  />)
                  :
                  <ButtonField
                    id="submit"
                    name="submit"
                    value="Edit"
                    customStyle="text-white font-bold md:text-xl lg:text-xl bg-btn-primary hover:bg-btn-primary-hover px-4 py-2 rounded-full w-1/5 "
                    onClick={(e) => {e.preventDefault(); this.props.history.push(`/branch/edit/${this.props.agencyId}/${this.props.regionId}/${this.props.branchId}`)}}
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

export default withRouter(BranchForm);
