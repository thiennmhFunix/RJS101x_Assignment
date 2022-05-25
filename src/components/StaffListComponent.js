import React from "react";
import { Card, CardImg, CardText } from "reactstrap";
import { Link } from "react-router-dom";

const StaffList = (props) => {
	return props.staffs.map((staff) => {
		if (staff != null)
			return (
				<div key={staff.id} className="col-6 col-sm-4 col-md-2">
					<Card>
						<Link to={`/stafflist/${staff.id}`}>
							<CardImg
								width="100%"
								src="/assets/images/vadonut.png"
								alt={staff.name}
							/>
							<CardText>{staff.name}</CardText>
						</Link>
					</Card>
				</div>
			);
	});
};

export default StaffList;
