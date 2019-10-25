import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Message from "Messages/Message";
import TextFieldInput from "FormFields/TextFieldInput";
import ButtonField from "FormFields/ButtonField";
import { authUtil } from "Utils/AuthUtil";
import { setButtonLoading } from "Actions/globalActions";
import { setAuthentionStatus } from "Actions/authActions";
import { setHeaderName } from "Actions/globalActions";
import { notification } from "Utils/ImageList";

import SignInValidations from "Components/signin/SignInValidations";

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: [],
			response: '',
		};
	}

	componentDidMount() {
		this.props.setHeaderName("/ SIGN IN");
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		delete this.state.errors[e.target.name];
	}

	submit = async e => {
		e.preventDefault();
		// this.props.history.push("/dashboard");
		if (SignInValidations(this.state).isValid) {
			this.props.setButtonLoading();
			const formData = {
				"username": this.state.email,
				"password": this.state.password
			};

			// User Sign in credentials
			let result = await authUtil("", formData, "/account/auth");
			if (result.status === 200) {
				this.setState({ response: "" });

				const token = result.data.token;

				sessionStorage.setItem('userToken', token);

				// Verify the user token
				this.props.setAuthentionStatus(true);

				this.props.history.push("/dashboard");
			} else {
				this.setState({ response: result.data.description });
			}
			await this.props.setButtonLoading();
			// this.props.history.push("/dashboard");
		} else {
			await this.setState({ errors: SignInValidations(this.state).errors });
		}
	}

	render = () => {
		let responseMessage = (
			<Message type="error" containerStyle="bg-yellow-error" msgStyle="text-si-grey" icon={notification} message={this.state.response} />
		);

		return (
			<div className="container mx-auto px-8 pb-4 lg:px-24 lg:pb-8">
				<div className="sm:block md:flex mt-8 pb-5">
					<div className="mx-auto mt-8 sm:mt-0 md:w-3/5 lg:w-3/5">
						<div className="px-24">{this.state.response && responseMessage}</div>
						<div className="text-center py-4">
							<h1>Welcome!</h1>
							<h4 className="my-2">Please sign in to continue</h4>
						</div>
						<form action="/" method="POST">
							<div className="w-full md:w-3/5 mt-0 mx-auto">
								<TextFieldInput
									id="email"
									name="email"
									type="text"
									placeholder="email"
									onChange={this.onChange}
									customStyle="w-full"
									containerStyle="flex flex-row"
									error={this.state.errors.email}
									value={this.state.email}
								/>
							</div>
							<div className="w-full md:w-3/5 mt-6 mx-auto">
								<TextFieldInput
									id="password"
									name="password"
									type="password"
									placeholder="password"
									onChange={this.onChange}
									customStyle="w-full"
									containerStyle="flex flex-row"
									error={this.state.errors.password}
									value={this.state.password}
								/>
							</div>
							<div className="text-center md:w-3/5 mt-6 mx-auto">
								<ButtonField
									id="submit"
									name="submit"
									value="Sign in"
									customStyle="text-white font-bold md:text-xl lg:text-2xl bg-btn-primary hover:bg-btn-primary-hover px-8 py-3 rounded-full w-3/5"
									onClick={this.submit}
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

SignIn.propTypes = {
	setButtonLoading: PropTypes.func.isRequired,
	setAuthentionStatus: PropTypes.func.isRequired,
	setHeaderName: PropTypes.func.isRequired
};

export default connect(
	null,
	{ setButtonLoading, setAuthentionStatus, setHeaderName }
)(withRouter(SignIn));
