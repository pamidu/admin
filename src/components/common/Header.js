import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutCurrentUser } from "Actions/authActions";

import { siLogo } from "Utils/ImageList";

class Header extends Component {
	logout = async e => {
		e.preventDefault();

		// Remove the auth token from backend
		await this.props.logoutCurrentUser(this.props.history);
	}

	render = () => {
		return (
			<div className="container mx-auto p-4 md:pt-12 lg:px-24">
				<h3 className="mb-2">Administration Portal</h3>
				<div className="flex flex-row">
					<Link to="/dashboard" className="flex"><img src={siLogo} className="imgLogo mt-2 sm:mt-0" alt="Surround Insurance Logo" /></Link>
					<div className="flex ml-2 text-md sm:text-2xl">{this.props.global.headerName}</div>
					{this.props.auth.isAuthenticated && <div onClick={this.logout} className="flex-1 mt-2 text-right cursor-pointer text-si-link">Log out</div>}
				</div>
			</div>
		);
	}
}

Header.propTypes = {
	global: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	global: state.global,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutCurrentUser }
)(withRouter(Header));
