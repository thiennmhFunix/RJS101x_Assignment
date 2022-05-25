import React from "react";
import { Card, CardText, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

const DepartmentList = (props) => {
	const departmentlist = props.departments.departments.map((department) => {
		return (
			<div key={department.id} className="col-12 col-sm-6 col-md-4">
				<Card>
					<Link to={`/departmentlist/${department.name}`}>
						<CardTitle>{department.name}</CardTitle>
						<CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
					</Link>
				</Card>
			</div>
		);
	});

	return (
		<div className="container">
			<div className="row">{departmentlist}</div>
		</div>
	);
};

export default DepartmentList;
