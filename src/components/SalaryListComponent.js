import React from "react";
import {
	Card,
	CardText,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

const SalaryList = (props) => {
	const salarylist = props.staffs.staffs ? (
		props.staffs.staffs.map((staff) => {
			return (
				<div key={staff.id} className="col-12 col-sm-6 col-md-4">
					<Card>
						<CardTitle>{staff.name}</CardTitle>
						<CardText>Mã nhân viên: {staff.id}</CardText>
						<CardText>Hệ số lương: {staff.salaryScale}</CardText>
						<CardText>Số giờ làm thêm: {staff.overTime}</CardText>
						<CardText>
							Lương:{" "}
							{parseInt(
								3000000 * staff.salaryScale + (staff.overTime * 200000) / 8,
								10
							)}
						</CardText>
					</Card>
				</div>
			);
		})
	) : (
		<div></div>
	);

	return (
		<div className="container">
			<div className="row">
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to="/stafflist">Nhân viên</Link>
					</BreadcrumbItem>
					<BreadcrumbItem active>Bảng lương</BreadcrumbItem>
				</Breadcrumb>
			</div>
			<div className="row">{salarylist}</div>
		</div>
	);
};

export default SalaryList;
