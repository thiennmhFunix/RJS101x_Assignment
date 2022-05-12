import React, { useState } from "react";
import { Card, CardImg, CardText, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import dateFormat from "dateformat";
import moment from "moment";
import { Link } from 'react-router-dom';

const StaffList = (props) => {

    const { staffs, savenewstaff } = props;

    const [searchKey, setSearchKey] = useState("");
    const [searchStaff, setSearchStaff] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);

    const [newStaffName, setNewStaffName] = useState("");
    const [newStaffDoB, setNewStaffDoB] = useState("");
    const [newStaffStartDate, setNewStaffStartDate] = useState("");
    const [newStaffDepartment, setNewStaffDepartment] = useState("");
    const [newStaffSalaryScale, setNewStaffSalaryScale] = useState("");
    const [newStaffAnnualLeave, setNewStaffAnnualLeave] = useState("");
    const [newStaffOverTime, setNewStaffOverTime] = useState("");

    const [newStaffNameError, setNewStaffNameError] = useState("");
    const [newStaffDoBError, setNewStaffDoBError] = useState("");
    const [newStaffStartDateError, setNewStaffStartDateError] = useState("");
    const [newStaffDepartmentError, setNewStaffDepartmentError] = useState("");
    const [newStaffSalaryScaleError, setNewStaffSalaryScaleError] = useState("");
    const [newStaffAnnualLeaveError, setNewStaffAnnualLeaveError] = useState("");
    const [newStaffOverTimeError, setNewStaffOverTimeError] = useState("");

    function handleSearch(e) {
        e.preventDefault();
        setSearchStaff(searchKey);
    }

    function toggleModal() {
        setModalOpen(!isModalOpen);
    };

    function handleAdd(e) {
        e.preventDefault();
        localStorage.setItem('newStaffName', newStaffName);
        localStorage.setItem('newStaffDoB', newStaffDoB);
        localStorage.setItem('newStaffStartDate', newStaffStartDate);
        localStorage.setItem('newStaffDepartment', newStaffDepartment);
        localStorage.setItem('newStaffSalaryScale', newStaffSalaryScale);
        localStorage.setItem('newStaffAnnualLeave', newStaffAnnualLeave);
        localStorage.setItem('newStaffOverTime', newStaffOverTime);

        const formValues = {
            id: 101,
            name: localStorage.getItem('newStaffName'),
            doB: localStorage.getItem('newStaffDoB'),
            salaryScale: localStorage.getItem('newStaffSalaryScale'),
            startDate: localStorage.getItem('newStaffStartDate'),
            department: {
                name: localStorage.getItem('newStaffDepartment')},
            annualLeave: localStorage.getItem('newStaffAnnualLeave'),
            overTime: localStorage.getItem('newStaffOverTime'),
            image: '/assets/images/vadonut.png',
        }

        toggleModal();

        savenewstaff(formValues);

    };

    function validateName(val) {
        if (val.length < 3) return setNewStaffNameError("At least 2 characters!");
        else return setNewStaffNameError("");
    }
    function validateDoB(val) {
        const m = moment().clone().subtract(18, 'years');
        if (dateFormat(val, "yyyy/mm/dd") > dateFormat(m, "yyyy/mm/dd")) return setNewStaffDoBError("Must greater than 18 years old!");
        else return setNewStaffDoBError("");
    }
    function validateStartDate(val) {
        if (dateFormat(val, "yyyy/mm/dd") > dateFormat(Date.now(), "yyyy/mm/dd")) return setNewStaffStartDateError("Must before today!");
        else return setNewStaffStartDateError("");
    }
    function validateDepartment(val) {
        if (!["Sale", "HR", "Marketing", "IT", "Finance"].includes(val)) return setNewStaffDepartmentError("This department is not available!");
        else return setNewStaffDepartmentError("");
    }
    function validateSalaryScale(val) {
        if (isNaN(val)) return setNewStaffSalaryScaleError("Must be a number");
        else if (val < 1 || val > 10) return setNewStaffSalaryScaleError("Must be between 1.0 and 10.0!");
        else return setNewStaffSalaryScaleError("");
    }
    function validateAnnualLeave(val) {
        if (isNaN(val)) return setNewStaffAnnualLeaveError("Must be a number");
        else if (val >= 14 || val < 0) return setNewStaffAnnualLeaveError("Must under 14 days!");
        else return setNewStaffAnnualLeaveError("");
    }
    function validateOverTime(val) {
        if (isNaN(val)) return setNewStaffOverTimeError("Must be a number");
        else if (val >= 7 || val < 0) return setNewStaffOverTimeError("Can't be over 7 days!");
        else return setNewStaffOverTimeError("");
    }

    const stafflistmenu = staffs.map(staff => {
        if (staff.name.toLowerCase().includes(searchStaff.toLowerCase())) {
            return (
                <div key={staff.id} className="col-6 col-sm-4 col-md-2">
                    <Card>
                        <Link to={`/stafflist/${staff.id}`} >
                            <CardImg width="100%" src="assets/images/vadonut.png" alt={staff.name} />
                            <CardText>{staff.name}</CardText>
                        </Link>
                    </Card>
                </div>
            )
        }  
    });

    const Newstafflistmenu = () => {
        if (localStorage.getItem('newStaffName').toLowerCase().includes(searchStaff.toLowerCase())) {
            return ( 
                <div key="101" className="col-6 col-sm-4 col-md-2">
                    <Card>
                        <Link to={`/stafflist/101`} >
                            <CardImg width="100%" src="assets/images/vadonut.png" alt={localStorage.getItem('newStaffName')} />
                            <CardText>{localStorage.getItem('newStaffName')}</CardText>
                        </Link>
                    </Card>
                </div>
            )
        }
    };

    // StaffList UI
    return (
        <div className="container">
            <div className="row">
                <h3 className="col-9 col-sm-4">Nhân viên</h3>
                <Button outline onClick={toggleModal} className="col-2 col-sm-1">
                    <span className="fa fa-solid fa-plus"></span>
                </Button>
                <Form onSubmit={handleSearch} className="col-12 col-sm-5">
                    <div className="row">
                        <FormGroup className="col-9">
                            <Input type="text" id="searchname" name="searchname" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary" className="col-2 col-sm-3">Tìm</Button>
                    </div>
                </Form>
                <hr /> 
            </div>

            <div className="row">
                {stafflistmenu}
                <Newstafflistmenu />
            </div>

            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader>Thêm nhân viên</ModalHeader>
                <ModalBody>
                <Form onSubmit={handleAdd}>
                        <FormGroup>
                            <Label htmlFor="staffName">Tên</Label>
                            <Input type="text" id="staffName" name="staffName" value={newStaffName} valid={newStaffNameError === ""} invalid={newStaffNameError !== ""} onChange={(e) => { setNewStaffName(e.target.value); validateName(e.target.value) }} />
                            <FormFeedback>{newStaffNameError}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="staffDoB">Ngày sinh</Label>
                            <Input type="date" id="staffDoB" name="staffDoB" value={newStaffDoB} valid={newStaffDoBError === ""} invalid={newStaffDoBError !== ""} onChange={(e) => { setNewStaffDoB(e.target.value); validateDoB(e.target.value) }} />
                            <FormFeedback>{newStaffDoBError}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="staffStartDate">Ngày vào công ty</Label>
                            <Input type="date" id="staffStartDate" name="staffStartDate" value={newStaffStartDate} valid={newStaffStartDateError === ""} invalid={newStaffStartDateError !== ""} onChange={(e) => { setNewStaffStartDate(e.target.value); validateStartDate(e.target.value) }} />
                            <FormFeedback>{newStaffStartDateError}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="staffDepartment">Phòng ban</Label>
                            <Input type="text" id="staffDepartment" name="staffDepartment" value={newStaffDepartment} valid={newStaffDepartmentError === ""} invalid={newStaffDepartmentError !== ""} onChange={(e) => { setNewStaffDepartment(e.target.value); validateDepartment(e.target.value) }} />
                            <FormFeedback>{newStaffDepartmentError}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="staffSalaryScale">Hệ số lương</Label>
                            <Input type="text" id="staffSalaryScale" name="staffSalaryScale" value={newStaffSalaryScale} valid={newStaffSalaryScaleError === ""} invalid={newStaffSalaryScaleError !== ""} onChange={(e) => { setNewStaffSalaryScale(e.target.value); validateSalaryScale(e.target.value) }} />
                            <FormFeedback>{newStaffSalaryScaleError}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="staffAnnualLeave">Số ngày nghỉ còn lại</Label>
                            <Input type="text" id="staffAnnualLeave" name="staffAnnualLeave" value={newStaffAnnualLeave} valid={newStaffAnnualLeaveError === ""} invalid={newStaffAnnualLeaveError !== ""} onChange={(e) => { setNewStaffAnnualLeave(e.target.value); validateAnnualLeave(e.target.value) }} />
                            <FormFeedback>{newStaffAnnualLeaveError}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="staffOverTime">Số ngày đã làm thêm</Label>
                            <Input type="text" id="staffOverTime" name="staffOverTime" value={newStaffOverTime} valid={newStaffOverTimeError === ""} invalid={newStaffOverTimeError !== ""} onChange={(e) => { setNewStaffOverTime(e.target.value); validateOverTime(e.target.value) }} />
                            <FormFeedback>{newStaffOverTimeError}</FormFeedback>
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Thêm</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );    
}


export default StaffList;