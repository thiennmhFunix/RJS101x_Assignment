import React, { useState } from "react";
import {
	Card,
	CardImg,
	CardText,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Label,
	Row,
	Col,
} from "reactstrap";
import FormPostStaff from "./FormPostStaffComponent";
import FormSearchStaff from "./FormSearchStaffComponent";
import { Control, LocalForm, Errors } from "react-redux-form";
import dateFormat from "dateformat";
import moment from "moment";
import { Link } from "react-router-dom";

const Home = (props) => {
	const { staffs, staffsLoading, staffsErrMess, searchStaffs, departments } =
		props;

	// const Newstafflistmenu = () => {
	// 	if (
	// 		localStorage
	// 			.getItem("newStaffName")
	// 			.toLowerCase()
	// 			.includes(searchStaff.toLowerCase())
	// 	) {
	// 		return (
	// 			<div key="101" className="col-6 col-sm-4 col-md-2">
	// 				<Card>
	// 					<Link to={`/stafflist/101`}>
	// 						<CardImg
	// 							width="100%"
	// 							src="assets/images/vadonut.png"
	// 							alt={localStorage.getItem("newStaffName")}
	// 						/>
	// 						<CardText>{localStorage.getItem("newStaffName")}</CardText>
	// 					</Link>
	// 				</Card>
	// 			</div>
	// 		);
	// 	}
	// };

	const StaffList = staffs.map((staff) => {
		return (
			<div key={staff.id} className="col-6 col-sm-4 col-md-2">
				<Card>
					<Link to={`/stafflist/${staff.id}`}>
						<CardImg
							width="100%"
							src="assets/images/vadonut.png"
							alt={staff.name}
						/>
						<CardText>{staff.name}</CardText>
					</Link>
				</Card>
			</div>
		);
	});

	return (
		<div className="container">
			<div className="row">
				<h3 className="col-9 col-sm-4">Nhân viên</h3>
				<FormPostStaff
					staffs={this.props.staffs}
					departments={this.props.departments}
				/>
				<FormSearchStaff searchStaffs={this.props.searchStaffs} />
				<hr />
			</div>

			<div className="row">
				<StaffList />
				{/* <Newstafflistmenu /> */}
			</div>
		</div>
	);
};

export default Home;
