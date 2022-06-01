import React from "react";
import {
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
} from "reactstrap";
import StaffList from "./StaffListComponent";
import { Loading } from "./LoadingComponent";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";

const DepartmentDetail = (props) => {
	if (props.staffs.isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />;
				</div>
			</div>
		);
	} else if (props.staffs.errMess) {
		return (
			<div className="container">
				<div className="row">
					<h4>{props.errMess}</h4>;
				</div>
			</div>
		);
	} else if (props.staffs.staffs && props.departments.isLoading != true) {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/departmentlist">Phòng ban</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>{props.department.name}</BreadcrumbItem>
					</Breadcrumb>
				</div>
				<div className="row">
					<StaffList
						staffs={props.staffs.staffs.filter(
							(staff) => staff.departmentId === props.department.id
						)}
						isLoading={props.staffs.isLoading}
						errMess={props.staffs.errMess}
						departments={props.departments}
					/>
				</div>
			</div>
		);
	} else return <div></div>;
};

export default DepartmentDetail;
