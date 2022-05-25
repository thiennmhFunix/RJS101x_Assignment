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
import { Control, LocalForm, Errors } from "react-redux-form";
import dateFormat from "dateformat";
import moment from "moment";
import { Link } from "react-router-dom";

const FormSearchStaff = (props) => {
	const { searchStaffs } = props;

	const [searchKey, setSearchKey] = useState("");

	function handleSearch() {
		searchStaffs(searchKey);
	}

	return (
		<div className="container">
			<LocalForm onSubmit={handleSearch} className="col-12 col-sm-5">
				<div className="row">
					<Row className="form-group">
						<Col md={7}>
							<Control.text
								model=".searchname"
								id="searchname"
								name="searchname"
								className="form-control"
								value={searchKey}
								onChange={(e) => setSearchKey(e.target.value)}
							/>
						</Col>
						<Col md={5}>
							<Button type="submit" color="primary">
								Tìm
							</Button>
						</Col>
					</Row>
				</div>
			</LocalForm>
		</div>
	);
};

export default FormSearchStaff;
