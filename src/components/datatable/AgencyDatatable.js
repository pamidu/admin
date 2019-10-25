import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactTable from "react-table";
import matchSorter from 'match-sorter'
import Pagination from "./Pagination";

import "./datatable.css";
import "react-table/react-table.css";

class AgencyDatatable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: ''
		};
	}
	
	selectItem = (id, mode) => {
    this.props.history.push(`/agency/${mode}/${id}`);
	}
	
	// componentDidUpdate(prevProps) {
  //   if(prevProps.data!==this.state.data){
  //     console.log("test")
  //   }
  // }

	render = () => {
		return (
			<div id="resultTable" className="agencyTable w-full">
				<ReactTable
					data={this.props.data}
					noDataText="No Available Data"
					filterable
					defaultFilterMethod={(filter, row) =>
						String(row[filter.id]) === filter.value}
					columns={[
						{
							Header: "Code",
							id: "code",
							maxWidth: 100,
							accessor: d => d.code,
							getProps: () => {
                return {
                    style: {
                        textAlign: "center",
                    },
                };
            	},
							filterMethod: (filter, rows) =>
								matchSorter(rows, filter.value, { keys: ["code"] }),
							filterAll: true
						},
						{
							Header: "Name",
							id: "legalName",
							maxWidth: 200,
							accessor: d => d.legalName,
							filterMethod: (filter, row) =>
								row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
						},
						{
							Header: "Location",
							id: "corporateAddress",
							maxWidth: 200,
							accessor: d => d.corporateAddress,
							filterMethod: (filter, row) =>
								row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
						},
						{
							Header: "Status",
							id: "status",
							maxWidth: 100,
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
							Header: "Actions",
							id: 'actions', 
							accessor: "id",
							maxWidth: 120,
							filterable:false,
							sortable:false,
							Cell: row => (
								<div className="flex flex-row actionButtons">
									<div className="flex mr-2"><button onClick={() => this.selectItem(row.value, "view")} >View</button></div>
									<div className="flex"><button onClick={() => this.selectItem(row.value, "edit")} >Edit</button></div>
								</div>
							)
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

export default withRouter(AgencyDatatable);
