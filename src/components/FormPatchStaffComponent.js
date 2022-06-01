import React, { useState } from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Label,
	Row,
	Col,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { useNavigate } from "react-router-dom";

import dateFormat from "dateformat";
import moment from "moment";

const FormPatchStaff = (props) => {
	const { patchStaff, staff } = props;

	const [isModalOpen, setModalOpen] = useState(false);
	const [updatedStaffName, setUpdatedStaffName] = useState(staff.name);
	const [updatedStaffDoB, setUpdatedStaffDoB] = useState(staff.doB);
	const [updatedStaffStartDate, setUpdatedStaffStartDate] = useState(
		staff.startDate
	);
	const [updatedStaffDepartment, setUpdatedStaffDepartment] = useState(
		staff.departmentId
	);
	const [updatedStaffSalaryScale, setUpdatedStaffSalaryScale] = useState(
		staff.salaryScale
	);
	const [updatedStaffAnnualLeave, setUpdatedStaffAnnualLeave] = useState(
		staff.annualLeave
	);
	const [updatedStaffOverTime, setUpdatedStaffOverTime] = useState(
		staff.overTime
	);

	let navigate = useNavigate();

	function toggleModal() {
		setModalOpen(!isModalOpen);
	}

	function handlePatch() {
		toggleModal();

		patchStaff(
			staff.id,
			updatedStaffName,
			updatedStaffDoB,
			updatedStaffStartDate,
			updatedStaffDepartment,
			updatedStaffSalaryScale,
			updatedStaffAnnualLeave,
			updatedStaffOverTime
		);

		navigate(`"../stafflist/${staff.id}"`, { replace: true });
	}

	const m = moment();

	const maxLength = (len) => (val) => !val || val.length <= len;
	const maxNumber = (num) => (val) => !val || val <= num;
	const maxDate = (year) => (val) =>
		val &&
		dateFormat(val, "yyyy/mm/dd") <=
			dateFormat(m.clone().subtract(year, "years"), "yyyy/mm/dd");
	const minLength = (len) => (val) => val && val.length >= len;
	const minNumber = (num) => (val) => val && val >= num;
	const isNumber = (val) => !isNaN(Number(val));

	const MyDateInput = (props) => <input type="date" {...props} />;

	return (
		<div className="container">
			<Button outline onClick={toggleModal} md={{ size: 10 }}>
				Chỉnh sửa thông tin nhân viên
			</Button>
			<Modal isOpen={isModalOpen} toggle={toggleModal}>
				<ModalHeader>Chỉnh sửa thông tin nhân viên</ModalHeader>
				<ModalBody>
					<LocalForm onSubmit={handlePatch}>
						<Row className="form-group">
							<Label htmlFor="staffName" md={5}>
								Tên
							</Label>
							<Col md={7}>
								<Control.text
									model=".staffName"
									id="staffName"
									name="staffName"
									className="form-control"
									value={updatedStaffName}
									defaultValue={staff.name}
									onChange={(e) => setUpdatedStaffName(e.target.value)}
									validators={{
										minLength: minLength(3),
										maxLength: maxLength(15),
									}}
								/>
							</Col>
							<Errors
								className="text-danger"
								model=".staffName"
								show="touched"
								messages={{
									minLength: "Must be greater than 2 characters",
									maxLength: "Must be 15 characters or less",
								}}
							/>
						</Row>
						<Row className="form-group">
							<Label htmlFor="staffDoB" md={5}>
								Ngày sinh
							</Label>
							<Col md={7}>
								<Control
									model=".staffDoB"
									component={MyDateInput}
									id="staffDoB"
									name="staffDoB"
									className="form-control"
									value={updatedStaffDoB}
									defaultValue={staff.doB}
									onChange={(e) => setUpdatedStaffDoB(e.target.value)}
									validators={{
										maxDate: maxDate(18),
									}}
								/>
							</Col>
							<Errors
								className="text-danger"
								model=".staffDoB"
								show="touched"
								messages={{
									maxDate: "Must be over 18 years old!",
								}}
							/>
						</Row>
						<Row className="form-group">
							<Label htmlFor="staffStartDate" md={5}>
								Ngày vào công ty
							</Label>
							<Col md={7}>
								<Control
									model=".staffStartDate"
									component={MyDateInput}
									id="staffStartDate"
									name="staffStartDate"
									className="form-control"
									value={updatedStaffStartDate}
									defaultValue={staff.startDate}
									onChange={(e) => setUpdatedStaffStartDate(e.target.value)}
									validators={{
										maxDate: maxDate(0),
									}}
								/>
							</Col>
							<Errors
								className="text-danger"
								model=".staffStartDate"
								show="touched"
								messages={{
									maxDate: "Must before today!",
								}}
							/>
						</Row>
						<Row className="form-group">
							<Label htmlFor="staffDepartment" md={5}>
								Phòng ban
							</Label>
							<Col md={7}>
								<Control.select
									model=".staffDepartment"
									id="staffDepartment"
									name="staffDepartment"
									className="form-control"
									value={updatedStaffDepartment}
									onChange={(e) => setUpdatedStaffDepartment(e.target.value)}
								>
									<option value="Dept01">Sale</option>
									<option value="Dept02">HR</option>
									<option value="Dept03">Marketing</option>
									<option value="Dept04">IT</option>
									<option value="Dept05">Finance</option>
								</Control.select>
							</Col>
						</Row>
						<Row className="form-group">
							<Label htmlFor="staffSalaryScale" md={5}>
								Hệ số lương
							</Label>
							<Col md={7}>
								<Control.text
									model=".staffSalaryScale"
									id="staffSalaryScale"
									name="staffSalaryScale"
									className="form-control"
									value={updatedStaffSalaryScale}
									defaultValue={staff.salaryScale}
									onChange={(e) => setUpdatedStaffSalaryScale(e.target.value)}
									validators={{
										minNumber: minNumber(0),
										maxNumber: maxNumber(10),
										isNumber,
									}}
								/>
							</Col>
							<Errors
								className="text-danger"
								model=".staffSalaryScale"
								show="touched"
								messages={{
									minNumber: "Must be a positive number!",
									maxNumber: "Must not be greater than 10.0!",
									isNumber: "Must be a number!",
								}}
							/>
						</Row>
						<Row className="form-group">
							<Label htmlFor="staffAnnualLeave" md={5}>
								Số ngày nghỉ còn lại
							</Label>
							<Col md={7}>
								<Control.text
									model=".staffAnnualLeave"
									id="staffAnnualLeave"
									name="staffAnnualLeave"
									className="form-control"
									value={updatedStaffAnnualLeave}
									defaultValue={staff.annualLeave}
									onChange={(e) => setUpdatedStaffAnnualLeave(e.target.value)}
									validators={{
										minNumber: minNumber(0),
										maxNumber: maxNumber(14),
										isNumber,
									}}
								/>
							</Col>
							<Errors
								className="text-danger"
								model=".staffAnnualLeave"
								show="touched"
								messages={{
									minNumber: "Must be a positive number of days!",
									maxNumber: "Must be less than 14 days!",
									isNumber: "Must be a number!",
								}}
							/>
						</Row>
						<Row className="form-group">
							<Label htmlFor="staffOverTime" md={5}>
								Số ngày đã làm thêm
							</Label>
							<Col md={7}>
								<Control.text
									model=".staffOverTime"
									id="staffOverTime"
									name="staffOverTime"
									className="form-control"
									value={updatedStaffOverTime}
									defaultValue={staff.overTime}
									onChange={(e) => setUpdatedStaffOverTime(e.target.value)}
									validators={{
										minNumber: minNumber(0),
										maxNumber: maxNumber(14),
										isNumber,
									}}
								/>
							</Col>
							<Errors
								className="text-danger"
								model=".staffOverTime"
								show="touched"
								messages={{
									minNumber: "Must be a positive number of days!",
									maxNumber: "Must be less than 14 days!",
									isNumber: "Must be a number!",
								}}
							/>
						</Row>
						<Row className="form-group">
							<Col md={{ size: 10, offset: 5 }}>
								<Button type="submit" color="primary">
									Cập nhật
								</Button>
							</Col>
						</Row>
					</LocalForm>
				</ModalBody>
			</Modal>
		</div>
	);
};

export default FormPatchStaff;
