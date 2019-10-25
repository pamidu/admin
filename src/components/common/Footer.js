import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { siLogoWhite, fb, twitter } from "Utils/ImageList";

class Footer extends Component {
	render = () => {
		return (
			<div id="footer" className="text-white py-4">
				<div className="container mx-auto sm:flex px-4 lg:px-24">
					<div className="text-center sm:text-left sm:flex-col">
						<img src={siLogoWhite} alt="" />
						<p className="sub-title mt-2">Copyright 2019</p>
					</div>
					<div className="sm:flex sm:flex-row mt-6 sm:mt-0 sm:px-4 mx-auto text-xs tracking-si-body3 leading-si-leading1">
						{this.props.auth.isAuthenticated && <div className="flex flex-row">
							<div className="flex flex-col sm:mr-4">
								<ul className="list-reset text-center sm:text-left">
									<li><Link to="/dashboard" className="cursor-pointer text-white text-base">Dashboard</Link></li>
								</ul>
							</div>
							<div className="flex flex-col sm:ml-4 text-xs tracking-si-body3 leading-si-leading1">
								<ul className="list-reset text-center sm:text-left">
									<li><Link to="/referralgenerator" className="cursor-pointer text-white text-base">Referral Generator</Link></li>
								</ul>
							</div>
						</div>}
					</div>
					<div className="text-center sm:text-left flex-col mt-2 md:mt-2">
						<a href="https://www.facebook.com/surroundinsurance/" target="_blank"><img src={fb} alt="Surround Insurance on Facebook" className="w-6 mr-1 md:w-10 md:mr-2" /></a>
						<a href="https://twitter.com/SurroundInsure" target="_blank"><img src={twitter} alt="Surround Insurance on Twitter" className="w-6 ml-1 md:w-10 md:ml-2" /></a>
					</div>
				</div>


			</div>
		);
	}
}

Footer.propTypes = {
	global: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	global: state.global,
	auth: state.auth
});

export default connect(
	mapStateToProps,
)(withRouter(Footer));

// export default withRouter(Footer);