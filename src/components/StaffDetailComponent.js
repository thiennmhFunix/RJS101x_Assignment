import React from "react";
import {
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
	Button,
} from "reactstrap";
import FormPatchStaff from "./FormPatchStaffComponent";
import FormDeleteStaff from "./FormDeleteStaffComponent";
import { FadeTransform } from "react-animation-components";
import { Loading } from "./LoadingComponent";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";

function RenderStaff(props) {
	if (props.isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />;
				</div>
			</div>
		);
	} else if (props.errMess) {
		return (
			<div className="container">
				<div className="row">
					<h4>{props.errMess}</h4>;
				</div>
			</div>
		);
	} else if (props.staff != null && props.departments.isLoading != true) {
		return (
			<div className="row">
				<div className="col-12 col-md-5 m-1">
					<FadeTransform
						in
						transformProps={{
							exitTransform: "scale(0.5) translateY(-50%)",
						}}
					>
						<CardImg
							width="100%"
							src="/assets/images/vadonut.png"
							alt={props.staff.name}
						/>
					</FadeTransform>
				</div>
				<div className="col-12 col-md-5 m-1">
					<CardBody>
						<CardTitle>Họ và tên: {props.staff.name}</CardTitle>
						<CardText>
							Ngày sinh: {dateFormat(props.staff.doB, "dd/mm/yyyy")}
						</CardText>
						<CardText>
							Ngày vào công ty:{" "}
							{dateFormat(props.staff.startDate, "dd/mm/yyyy")}
						</CardText>
						<CardText>
							Phòng ban:{" "}
							{props.staff.departmentId != ""
								? props.departments.departments.filter(
										(department) => department.id === props.staff.departmentId
								  )[0].name
								: "Empty"}
						</CardText>
						<CardText>Số ngày nghỉ còn lại: {props.staff.annualLeave}</CardText>
						<CardText>Số ngày đã làm thêm: {props.staff.overTime}</CardText>
					</CardBody>
					<FormPatchStaff patchStaff={props.patchStaff} staff={props.staff} />
					<FormDeleteStaff
						deleteStaff={props.deleteStaff}
						staff={props.staff}
					/>
				</div>
			</div>
		);
	} else {
		return <div></div>;
	}
}

const StaffDetail = (props) => {
	if (props.staff != null) {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/stafflist">Nhân viên</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
					</Breadcrumb>
				</div>
				<RenderStaff
					staff={props.staff}
					isLoading={props.isLoading}
					errMess={props.errMess}
					departments={props.departments}
					patchStaff={props.patchStaff}
					deleteStaff={props.deleteStaff}
				/>
			</div>
		);
	}
};

export default StaffDetail;
