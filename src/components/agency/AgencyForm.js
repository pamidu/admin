import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

import TextFieldInput from "FormFields/TextFieldInput";
import ButtonField from "FormFields/ButtonField";
import RadioButtonInput from "FormFields/RadioButtonInput";
import SelectFieldInput from "FormFields/SelectFieldInput";
import CalendarFieldInput from "FormFields/Calendar/CalendarFieldInput";
import InitiatorList from "Common/Filters/InitiatorList";
import ReasonCodes from "Common/Filters/ReasonCodes";
import CountryStates from "Common/Filters/CountryStates";
import BusinessList from "Common/Filters/BusinessList";

const countryOptions = CountryStates.options;
const BusinessOptions = BusinessList.options;
const initiatorList = InitiatorList.options;
const reasonCodes = ReasonCodes.options;


class AgencyForm extends Component {
  isReadOnly() {
    return this.props.states.mode === "view";
  }

  componentDidUpdate(prevProps) {
    if(prevProps.states.mode!==this.props.states.mode){
      this.props.setFields();
    }
  }

  render() {
    let superProducerContent;

    if ((this.props.states.mode !== "edit" && this.props.states.status === "ACTIVE") || (this.props.states.mode === "edit" && this.props.states.status === "ACTIVE" && this.props.states.previousStatus === "HOLD")) {
      superProducerContent = (
        <section className="py-8">
          <span className="text-lg font-semibold">Super Producer (Mass Data)*</span>
          <div className="flex flex-row py-2 items-baseline">
            <div className="flex w-1/3 pr-4">Legal First Name</div>
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
            <div className="flex w-1/3 pr-4">Legal Last Name</div>
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
            <div className="flex w-1/3 pr-4">Super User Contact's Name</div>
            <div className="flex-1 w-2/3">
              <TextFieldInput
                id="superUserContactName"
                name="superUserContactName"
                type="text"
                placeholder="agency super user contact name"
                onChange={this.props.onChange}
                customStyle="w-full"
                containerStyle="flex flex-row"
                value={this.props.states.superUserContactName}
                error={this.props.states.errors.superUserContactName}
                readonly={this.isReadOnly()}
                maxLength="50"
              /></div>
          </div>
          <div className="flex flex-row py-2 items-baseline">
            <div className="flex w-1/3 pr-4">Super User's Email</div>
            <div className="flex-1 w-2/3">
              <TextFieldInput
                id="superUserEmail"
                name="superUserEmail"
                type="text"
                placeholder="agency super user account"
                onChange={this.props.onChange}
                customStyle="w-full"
                containerStyle="flex flex-row"
                value={this.props.states.superUserEmail}
                error={this.props.states.errors.superUserEmail}
                readonly={this.isReadOnly()}
                maxLength="50"
              /></div>
          </div>
          <div className="flex flex-row py-2 items-baseline">
            <div className="flex w-1/3 pr-4">NPN</div>
            <div className="flex-1 w-2/3">
              <TextFieldInput
                id="producerNPN"
                name="producerNPN"
                type="text"
                placeholder="string"
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
                <div className="flex w-1/3 pr-4">Producer Phone</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="producerPhoneNumber"
                    name="producerPhoneNumber"
                    type="text"
                    placeholder="string (000-000-0000)"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.producerPhoneNumber}
                    error={this.props.states.errors.producerPhoneNumber}
                    readonly={this.isReadOnly()}
                    maxLength='14'
                  /></div>
              </div>
          <div className="flex flex-row py-2 items-baseline">
            <div className="flex w-1/3 pr-4">License Number</div>
            <div className="flex-1 w-2/3">
              <TextFieldInput
                id="producerLicenseNumber"
                name="producerLicenseNumber"
                type="text"
                placeholder="string"
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
                placeholder="string (eg. 04/22/2019)"
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
        </section>
      );
    } else {
      superProducerContent = null;
    }

    return (
      <div className="py-6">
        <h3>{this.props.states.mode === "addnew" ? "Add Agency" : this.props.states.mode === "edit" ? "Edit Agency" : "View Agency"}</h3>
        <div className="w-4/5">
          <form className="text-base">
            <section className="pb-8">
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Legal Name*</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="legalName"
                    name="legalName"
                    type="text"
                    placeholder="globally unique, string (ABC Agency)"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.legalName}
                    error={this.props.states.errors.legalName}
                    readonly={this.isReadOnly()}
                    maxLength="50"
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Doing Bussiness As*</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="doingBusinessAs"
                    name="doingBusinessAs"
                    type="text"
                    placeholder="optional, string (something..)"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.doingBusinessAs}
                    error={this.props.states.errors.doingBusinessAs}
                    readonly={this.isReadOnly()}
                    maxLength="50"
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Employer Identification Number*</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="employerIdentificationNumber"
                    name="employerIdentificationNumber"
                    type="text"
                    placeholder="string (eg. XX-XXXXXXX)"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.employerIdentificationNumber}
                    error={this.props.states.errors.employerIdentificationNumber}
                    readonly={this.isReadOnly()}
                    maxLength="10"
                  /></div>
              </div>
            </section>
            <section className="py-8">
              <span className="text-lg font-semibold">License (Mass Data)*</span>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">License Number</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="licenseNumber"
                    name="licenseNumber"
                    type="text"
                    placeholder="string (eg. XXXXXXX)"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.licenseNumber}
                    error={this.props.states.errors.licenseNumber}
                    readonly={this.isReadOnly()}
                    maxLength="7"
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Licensed State(s)</div>
                <div className="flex-1 w-2/3">
                  <SelectFieldInput
                    id="licensedStates"
                    name="licensedStates"
                    onChange={this.props.handleChange}
                    value={this.props.states.selectedLicensedStates}
                    options={countryOptions}
                    disabled={this.isReadOnly()}
                    multi={true}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    error={this.props.states.errors.licensedStates}
                  />
                </div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Line(s) - of Business</div>
                <div className="flex-1 w-2/3">
                  <SelectFieldInput
                    id="lineOfBusiness"
                    name="lineOfBusiness"
                    placeholder="Select... (eg. Accident and Health or Sickness, Life, Property, Casualty, Travel Accident and Baggage )"
                    onChange={this.props.handleChange}
                    value={this.props.states.selectedLineOfBusiness}
                    options={BusinessOptions}
                    disabled={this.isReadOnly()}
                    multi={true}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    error={this.props.states.errors.lineOfBusiness}
                  />
                </div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">License Renewal Date</div>
                <div className="flex-1 w-2/3">
                  <CalendarFieldInput
                    id="licenseRenewalDate"
                    name="licenseRenewalDate"
                    placeholder="string (eg. 04/22/2019)"
                    customStyle="w-full"
                    containerStyle="flex flex-row w-5/6 sm:w-full"
                    onChange={this.props.onDateChange}
                    value={this.props.states.licenseRenewalDate}
                    error={this.props.states.errors.licenseRenewalDate}
                    readonly={this.isReadOnly()}
                    maxLength="10"
                  />
                </div>
              </div>
            </section>
            <section className="py-8">
              <span className="text-lg font-semibold">Contact Details*</span>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Corporate Address</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="corporateAddress"
                    name="corporateAddress"
                    type="text"
                    placeholder="string (200 Brookline Ave, Boston, MA)"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.corporateAddress}
                    error={this.props.states.errors.corporateAddress}
                    readonly={this.isReadOnly()}
                    maxLength="150"
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Corporate Phone</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="corporatePhone"
                    name="corporatePhone"
                    type="text"
                    placeholder="string (000-000-0000)"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.corporatePhone}
                    error={this.props.states.errors.corporatePhone}
                    readonly={this.isReadOnly()}
                    maxLength='14'
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Corporate Email</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="corporateEmail"
                    name="corporateEmail"
                    type="text"
                    placeholder="string"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.corporateEmail}
                    error={this.props.states.errors.corporateEmail}
                    readonly={this.isReadOnly()}
                    maxLength="50"
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Contact Person's Name</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="contactPersonName"
                    name="contactPersonName"
                    type="text"
                    placeholder="string"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.contactPersonName}
                    error={this.props.states.errors.contactPersonName}
                    readonly={this.isReadOnly()}
                    maxLength="50"
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Contact Person's Phone</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="contactPersonPhone"
                    name="contactPersonPhone"
                    type="text"
                    placeholder="string (000-000-0000)"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.contactPersonPhone}
                    error={this.props.states.errors.contactPersonPhone}
                    readonly={this.isReadOnly()}
                    maxLength='14'
                  /></div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Contact Person's Email</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="contactPersonEmail"
                    name="contactPersonEmail"
                    type="text"
                    placeholder="string"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.contactPersonEmail}
                    error={this.props.states.errors.contactPersonEmail}
                    readonly={this.isReadOnly()}
                    maxLength="50"
                  /></div>
              </div>
            </section>
            <section className="py-8">
              <span className="text-lg font-semibold">Agency Information</span>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4"></div>
                <div className="flex-1 w-2/3">
                  <RadioButtonInput
                    id="commissionPaymentDetails"
                    name="commissionPaymentDetails"
                    type="checkbox"
                    label="Commission Payment Details"
                    onChange={this.props.onSelect}
                    customStyle=""
                    containerStyle="mr-2 mt-1 "
                    labelStyle="block text-base text-si-grey"
                    value={this.props.states.commissionPaymentDetails}
                    disabled={this.isReadOnly()}
                  />
                </div>
              </div>
              <div className="flex flex-row py-2 items-baseline">
                <div className="flex w-1/3 pr-4">Agency Management System*</div>
                <div className="flex-1 w-2/3">
                  <TextFieldInput
                    id="agencyManagementSystem"
                    name="agencyManagementSystem"
                    type="text"
                    placeholder="agency super user account (agency management system)"
                    onChange={this.props.onChange}
                    customStyle="w-full"
                    containerStyle="flex flex-row"
                    value={this.props.states.agencyManagementSystem}
                    error={this.props.states.errors.agencyManagementSystem}
                    readonly={this.isReadOnly()}
                    maxLength="50"
                  /></div>
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
            </section>
            {superProducerContent}

            {this.props.states.mode === "edit" && this.props.states.status !== "ACTIVE" &&
              <section className="pb-8">
                <span className="text-lg font-semibold">Reason for Deactivation</span>
                <div className="flex flex-row py-2 items-baseline">
                  <div className="flex w-1/3 pr-4">Initiator</div>
                  <div className="flex-1 w-2/3">
                    <SelectFieldInput
                      id="deactivationInitiator"
                      name="deactivationInitiator"
                      onChange={this.props.onChange}
                      options={initiatorList}
                      customStyle="w-full"
                      containerStyle="flex flex-row"
                      selected={this.props.states.deactivationInitiator}
                      error={this.props.states.errors.deactivationInitiator}
                    /></div>
                </div>
                <div className="flex flex-row py-2 items-baseline">
                  <div className="flex w-1/3 pr-4">Reason Code</div>
                  <div className="flex-1 w-2/3">
                    <SelectFieldInput
                      id="deactivationReasonCode"
                      name="deactivationReasonCode"
                      onChange={this.props.onChange}
                      options={reasonCodes}
                      customStyle="w-full"
                      containerStyle="flex flex-row"
                      selected={this.props.states.deactivationReasonCode}
                      error={this.props.states.errors.deactivationReasonCode}
                    /></div>
                </div>
                <div className="flex flex-row py-2 items-baseline">
                  <div className="flex w-1/3 pr-4">Comments</div>
                  <div className="flex-1 w-2/3">
                    <TextFieldInput
                      id="deactivationComment"
                      name="deactivationComment"
                      type="text"
                      placeholder="string"
                      onChange={this.props.onChange}
                      customStyle="w-full"
                      containerStyle="flex flex-row"
                      value={this.props.states.deactivationComment}
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
                      onClick={this.props.editAgency}
                    />
                    : <ButtonField
                      id="submit"
                      name="submit"
                      value="Submit"
                      customStyle="text-white font-bold md:text-xl lg:text-xl bg-btn-primary hover:bg-btn-primary-hover px-4 py-2 rounded-full w-1/5 "
                      onClick={this.props.addAgency}
                    />)
                  :
                  <ButtonField
                    id="submit"
                    name="submit"
                    value="Edit"
                    customStyle="text-white font-bold md:text-xl lg:text-xl bg-btn-primary hover:bg-btn-primary-hover px-4 py-2 rounded-full w-1/5 "
                    onClick={(e) => { e.preventDefault(); this.props.history.push(`/agency/edit/${this.props.agencyId}`) }}
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

export default withRouter(AgencyForm);
