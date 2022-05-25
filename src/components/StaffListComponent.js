import React from "react";
import { Card, CardImg, CardText } from "reactstrap";
import { FadeTransform } from "react-animation-components";
import { Loading } from "./LoadingComponent";
import { Link } from "react-router-dom";

const StaffList = (props) => {
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
	} else if (props.staffs != null && props.departments.isLoading != true) {
		return props.staffs.map((staff) => {
			if (staff != null)
				return (
					<div key={staff.id} className="col-6 col-sm-4 col-md-2">
						<FadeTransform
							in
							transformProps={{
								exitTransform: "scale(0.5) translateY(-50%)",
							}}
						>
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
						</FadeTransform>
					</div>
				);
		});
	} else return <div></div>;
};

export default StaffList;
