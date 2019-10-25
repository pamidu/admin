import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactTable from "react-table";
import matchSorter from 'match-sorter'
import Pagination from "./Pagination";

import { star } from "Utils/ImageList";

import "./datatable.css";
import "react-table/react-table.css";

class ProducerDatatable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: ''
		};
	}
	
	selectItem = (agencyId, regionId, branchId, id, mode) => {
    this.props.history.push(`/producer/${mode}/${agencyId}/${regionId}/${branchId}/${id}`);
	}
	
	// componentDidUpdate(prevProps) {
  //   if(prevProps.data!==this.state.data){
  //     console.log("test")
  //   }
  // }

	render = () => {
		return (
			<div id="resultTable" className="producerTable w-full">
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
							accessor: d => [d.role,d.code],
							getProps: () => {
                return {
                    style: {
                        textAlign: "center",
                    },
                };
							},
							Cell: row => (
								<div className="relative"><span>{row.value[1]}</span>{row.value[0] === 'SUPER_PRODUCER' ? <img src={star} alt="Super Producer" title="Super Producer" className="w-4 h-4 absolute"/>:<span className="w-4 h-4 pt-1"></span> }</div>
								),
							filterMethod: (filter, rows) =>
								matchSorter(rows, filter.value, { keys: ["code"] }),
							filterAll: true
						},
						{
							Header: "Legal Name",
							id: "legalName",
							maxWidth: 200,
							accessor: d => `${d.legalFirstName} ${d.legalLastName}`,
							filterMethod: (filter, row) =>
								row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
						},
						{
							Header: "Agency",
							id: "agency",
							maxWidth: 200,
							accessor: d => `${d.agencyName}-${d.agencyCode}`,
							filterMethod: (filter, row) =>
								row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
						},
						{
							Header: "Region",
							id: "region",
							maxWidth: 200,
							accessor: d => `${d.regionName}-${d.regionCode}`,
							filterMethod: (filter, row) =>
								row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
						},
						{
							Header: "Branch",
							id: "branch",
							maxWidth: 200,
							accessor: d => `${d.branchName}-${d.branchCode}`,
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
							accessor: d => [d.agencyId, d.regionId, d.branchId, d.id],
							maxWidth: 120,
							filterable:false,
							sortable:false,
							Cell: row => (
								<div className="flex flex-row actionButtons">
									<div className="flex mr-2"><button onClick={() => this.selectItem(row.value[0], row.value[1], row.value[2], row.value[3], "view")} >View</button></div>
									<div className="flex"><button onClick={() => this.selectItem(row.value[0], row.value[1], row.value[2], row.value[3], "edit")} >Edit</button></div>
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

export default withRouter(ProducerDatatable);
