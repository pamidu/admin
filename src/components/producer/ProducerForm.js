import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

import ButtonField from "FormFields/ButtonField";
import TextFieldInput from "FormFields/TextFieldInput";
import RadioButtonInput from "FormFields/RadioButtonInput";
import SelectFieldInput from "FormFields/SelectFieldInput";
import CalendarFieldInput from "FormFields/Calendar/CalendarFieldInput";
import ReasonCodes from "Common/Filters/ReasonCodes";
import CountryStates from "Common/Filters/CountryStates";
import BusinessList from "Common/Filters/BusinessList";

const countryOptions = CountryStates.options;
const BusinessOptions = BusinessList.options;
const reasonCodes = ReasonCodes.options;

class ProducerForm extends Component {
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
      <h3>{this.props.states.mode === "addnew" ? "Add Producer" : this.props.states.mode === "edit" ? "Edit Producer" : "View Producer" }</h3>          
        <div className="w-4/5">
          <form className="text-base">
            <section className="pb-8">
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Legal First Name*</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="legalfirstname"
                    name="legalfirstname"
                    type="text"
                    placeholder="globally unique, string"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.legalfirstname}
                    error={this.props.states.errors.legalfirstname}
                    readonly={this.isReadOnly()}
                    maxLength="50"
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Legal Last Name*</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="legallastname"
                    name="legallastname"
                    type="text"
                    placeholder="globally unique, string"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.legallastname}
                    error={this.props.states.errors.legallastname}
                    readonly={this.isReadOnly()}
                    maxLength="50"
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Preferred Name*</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="preferredname"
                    name="preferredname"
                    type="text"
                    placeholder="globally unique, string"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.preferredname}
                    error={this.props.states.errors.preferredname}
                    readonly={this.isReadOnly()}
                    maxLength="50"
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Contact Phone*</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="contactphone"
                    name="contactphone"
                    type="text"
                    placeholder="number"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.contactphone}
                    error={this.props.states.errors.contactphone}
                    readonly={this.isReadOnly()}
                    maxLength="14"
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Contact Email*</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="contactemail"
                    name="contactemail"
                    type="text"
                    placeholder="string"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.contactemail}
                    error={this.props.states.errors.contactemail}
                    readonly={this.isReadOnly() || this.props.states.mode === "edit"}
                    maxLength="50"
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
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Branch*</div>
                <div className="flex-1 w-2/3">
                  <SelectFieldInput
                    id="branchId"
                    name="branchId"
                    onChange={this.props.onChange}
                    options={this.props.states.branchOptions}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    selected={this.props.states.branchId}
                    disabled={this.isReadOnly()}
                  /></div>
              </div>
            </section>
            <section className="py-8">
              <span className="text-lg font-semibold">License (Mass Data)*</span>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">NPN</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="producerNPN"
                    name="producerNPN"
                    type="text"
                    placeholder="number"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.producerNPN}
                    error={this.props.states.errors.producerNPN}
                    readonly={this.isReadOnly()}
                    maxLength="8"
                  />
                </div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">License Number</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="producerLicenseNumber"
                    name="producerLicenseNumber"
                    type="text"
                    placeholder="number"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.producerLicenseNumber}
                    error={this.props.states.errors.producerLicenseNumber}
                    readonly={this.isReadOnly()}
                    maxLength="7"
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Licensed State(s)</div>
                <div className="flex-1 w-2/3">
                  <SelectFieldInput
                    id="producerLicensedStates"
                    name="producerLicensedStates"
                    onChange={this.props.handleChange}
                    value={this.props.states.selectedProducerLicensedStates}
                    options={countryOptions}
                    disabled={this.isReadOnly()}
                    multi={true}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    error={this.props.states.errors.producerLicensedStates}
                  />
                </div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Line(s) - of Business</div>
                <div className="flex-1 w-2/3">
                  <SelectFieldInput
                    id="producerLinesofBusiness"
                    name="producerLinesofBusiness"
                    onChange={this.props.handleChange}
                    placeholder="Select... (eg. Accident and Health or Sickness, Life, Property, Casualty, Travel Accident and Baggage )"
                    value={this.props.states.selectedProducerLineOfBusiness}
                    options={BusinessOptions}
                    disabled={this.isReadOnly()}
                    multi={true}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    error={this.props.states.errors.producerLinesofBusiness}
                  />
                </div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">License Renewal Date</div>
                <div className="flex-1 w-2/3">
                  <CalendarFieldInput
                    id="producerLicenseRenewalDate"
                    name="producerLicenseRenewalDate"
                    placeholder="date (eg. 04/22/2019)"
                    customStyle="w-full"
                    containerStyle="flex flex-row w-5/6 sm:w-full"
                    onChange={this.props.onDateChange}
                    value={this.props.states.producerLicenseRenewalDate}
                    error={this.props.states.errors.producerLicenseRenewalDate}
                    readonly={this.isReadOnly()}
                    maxLength="10"
                  />
                </div>
              </div>
            </section>
            <section className="py-8">
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4"></div>
                <div className="flex-1 w-2/3">
                  <RadioButtonInput
                    id="opraappointedcheck"
                    name="opraappointedcheck"
                    type="checkbox"
                    label="OPRA appointed"
                    onChange={this.props.onSelect}
                    customStyle=""
                    containerStyle="mr-2 mt-1 "
                    labelStyle="block text-base text-si-grey"
                    value={this.props.states.opraappointedcheck}
                    disabled={this.isReadOnly()}
                  />
                </div>
              </div>
              {this.props.states.mode !== "addnew" &&
                <div className="flex flex-row py-2 items-baseline">
                  <div className="flex w-1/3 pr-4">Code*</div>
                  <div className="flex-1 w-2/3">
                    <TextFieldInput
                      id="code"
                      name="code"
                      type="text"
                      placeholder="Auto-gen/read-only. globally unique, format AGXXXXX; AG00001"
                      onChange={this.props.onChange}
                      customStyle="w-full"
                      containerStyle="flex flex-row"
                      value={this.props.states.code}
                      disabled="disabled"
                    /></div>
                </div>
              }
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Status</div>
                <div className="flex-1 w-2/3">
                  <SelectFieldInput
                    id="status"
                    name="status"
                    onChange={this.props.onChange}
                    options={this.props.states.statusOptions}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    selected={this.props.states.status}
                    disabled={this.isReadOnly()}
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4"></div>
                <div className="flex-1 w-2/3">
                  <RadioButtonInput
                    id="isSuperProducer"
                    name="isSuperProducer"
                    type="checkbox"
                    label="Super Producer"
                    onChange={this.props.onSelect}
                    customStyle=""
                    containerStyle="mr-2 mt-1 "
                    labelStyle="block text-base text-si-grey"
                    value={this.props.states.isSuperProducer}
                    disabled={this.isReadOnly() || this.props.states.defaultSuperProducer}
                  />
                </div>
              </div>
            </section>
            {this.props.states.mode === "edit" && this.props.states.status !== "ACTIVE" &&
              <section className="pb-8">
                <span className="text-lg font-semibold">Reason for Deactivation</span>
                <div className="flex flex-row py-2 items-baseline">
                  <div className="flex w-1/3 pr-4">Reason Code</div>
                  <div className="flex-1 w-2/3">
                    <SelectFieldInput
                      id="reasoncode"
                      name="reasoncode"
                      onChange={this.props.onChange}
                      options={reasonCodes}
                      customStyle="w-full"
                      containerStyle="flex flex-row"
                      selected={this.props.states.reasoncode}
                      error={this.props.states.errors.reasoncode}
                    /></div>
                </div>
                <div className="flex flex-row py-2 items-baseline">
                  <div className="flex w-1/3 pr-4">Comments</div>
                  <div className="flex-1 w-2/3">
                    <TextFieldInput
                      id="comments"
                      name="comments"
                      type="text"
                      placeholder="string"
                      onChange={this.props.onChange}
                      customStyle="w-full"
                      containerStyle="flex flex-row"
                      value={this.props.states.comments}
                      maxLength="250"
                    /></div>
                </div>
              </section>
            }
           <section>
              <div className="text-center p-4 mt-4">
                {!this.isReadOnly() ?
                  (this.props.states.mode === "edit" ?
                    <ButtonField
                    id="submit"
                    name="submit"
                    value="Save"
                    customStyle="text-white font-bold md:text-xl lg:text-xl bg-btn-primary hover:bg-btn-primary-hover px-4 py-2 rounded-full w-1/5 "
                    onClick={this.props.editProducer}
                  />
                  : <ButtonField
                    id="submit"
                    name="submit"
                    value="Submit"
                    customStyle="text-white font-bold md:text-xl lg:text-xl bg-btn-primary hover:bg-btn-primary-hover px-4 py-2 rounded-full w-1/5 "
                    onClick={this.props.addProducer}
                  />)
                  :
                  <ButtonField
                    id="submit"
                    name="submit"
                    value="Edit"
                    customStyle="text-white font-bold md:text-xl lg:text-xl bg-btn-primary hover:bg-btn-primary-hover px-4 py-2 rounded-full w-1/5 "
                    onClick={(e) => {e.preventDefault(); this.props.history.push(`/producer/edit/${this.props.agencyId}/${this.props.regionId}/${this.props.branchId}/${this.props.producerId}`)}}
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

export default withRouter(ProducerForm);
