import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactTable from "react-table";
import matchSorter from 'match-sorter'
import Pagination from "./Pagination";

import "./datatable.css";
import "react-table/react-table.css";

class ReferralGeneratedDatatable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: ''
		};
	}
	
	render = () => {
		return (
			<div id="resultTable" className="leadURLTable w-full">
				<ReactTable
					data={this.props.data}
					noDataText="No Available Data"
					filterable
					defaultFilterMethod={(filter, row) =>
						String(row[filter.id]) === filter.value}
					columns={[
						{
							Header: "Referral Name",
							id: "name",
							maxWidth: 250,
							accessor: d => [d.name, d.url],
							filterMethod: (filter, row) =>
								row[filter.id][0].toLowerCase().startsWith(filter.value.toLowerCase()),
							Cell: row => (
								<a href={row.value[1]} target="_blank" >{row.value[0]}</a>
							)
						},
						{
							Header: "Status",
							id: "status",
							maxWidth: 80,
							filterable:false,
							sortable:false,
							accessor: d => d.status,
							getProps: () => {
                return {
                    style: {
                        textAlign: "center",
                    },
                };
            	},
							filterMethod: (filter, rows) =>
								matchSorter(rows, filter.value, { keys: ["status"] }),
							filterAll: true
						},
						{
							Header: "Owner",
							id: "owner",
							maxWidth: 100,
							accessor: d => d.owner,
							getProps: () => {
                return {
                    style: {
                        textAlign: "center",
                    },
                };
            	},
							filterMethod: (filter, rows) =>
								matchSorter(rows, filter.value, { keys: ["owner"] }),
							filterAll: true
						},
						{
							Header: "Landing Page",
							id: "landingScreen",
							maxWidth: 100,
							accessor: d => d.landingScreen,
							getProps: () => {
                return {
                    style: {
                        textAlign: "center",
                    },
                };
            	},
							filterMethod: (filter, rows) =>
								matchSorter(rows, filter.value, { keys: ["landingScreen"] }),
							filterAll: true
						},
						{
							Header: "Agency/Region/Branch/Producer",
							id: "filters",
							maxWidth: 250,
							accessor: d => d.referralUrlCodeCombination,	
							filterable:false,
							sortable:false
						}
					]}
					defaultPageSize={100}
					style={{
						height: "400px"
					}}
					className="-striped -highlight"
					PaginationComponent={Pagination}
				/>
			</div>
		)
	}
}

export default withRouter(ReferralGeneratedDatatable);
