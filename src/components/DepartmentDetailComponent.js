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
				/>
			</div>
		</div>
	);
};

export default DepartmentDetail;
