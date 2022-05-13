import React, { useState } from "react";
import { Card, CardImg, CardText, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from "react-redux-form";
import dateFormat from "dateformat";
import moment from "moment";
import { Link } from 'react-router-dom';

const StaffList = (props) => {

    const { staffs, savenewstaff, departments } = props;

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

    function handleSearch() {
        setSearchStaff(searchKey);
    }

    function toggleModal() {
        setModalOpen(!isModalOpen);
    };

    function handleAdd() {
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

    const m = moment();

    const required = (val) => val && val.length;
    const validateDepartment = (val) => val && departments.filter(department => department.name === val).length > 0;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const maxNumber = (num) => (val) => !(val) || (val <= num);
    const maxDate = (year) => (val) => val && dateFormat(val, 'yyyy/mm/dd') <= dateFormat(m.clone().subtract(year, 'years'), 'yyyy/mm/dd');
    const minLength = (len) => (val) => val && (val.length >= len);
    const minNumber = (num) => (val) => val && (val >= num);
    const isNumber = (val) => !isNaN(Number(val));

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

    const MyDateInput = (props) => <input type="date" {...props} />;

    // StaffList UI
    return (
        <div className="container">
            <div className="row">
                <h3 className="col-9 col-sm-4">Nhân viên</h3>
                <Button outline onClick={toggleModal} className="col-2 col-sm-1">
                    <span className="fa fa-solid fa-plus"></span>
                </Button>
                <LocalForm onSubmit={handleSearch} className="col-12 col-sm-5">
                    <div className="row">
                        <Row className="form-group">
                            <Col md={7}>
                                <Control.text model=".searchname" id="searchname" name="searchname" className="form-control" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                            </Col>
                            <Col md={5}>
                                <Button type="submit" color="primary">Tìm</Button>
                            </Col>
                        </Row>
                    </div>
                </LocalForm>
                <hr /> 
            </div>

            <div className="row">
                {stafflistmenu}
                <Newstafflistmenu />
            </div>

            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader>Thêm nhân viên</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={handleAdd}>
                        <Row className="form-group">
                            <Label htmlFor="staffName" md={5}>Tên</Label>
                            <Col md={7}>
                                <Control.text model=".staffName" id="staffName" name="staffName" className="form-control" value={newStaffName} onChange={(e) => setNewStaffName(e.target.value)} validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                }} />
                            </Col>
                            <Errors
                                className="text-danger"
                                model=".staffName"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="staffDoB" md={5}>Ngày sinh</Label>
                            <Col md={7}>
                                <Control model=".staffDoB" component={MyDateInput} id="staffDoB" name="staffDoB" className="form-control" value={newStaffDoB} onChange={(e) => setNewStaffDoB(e.target.value)} validators={{
                                    required, maxDate: maxDate(18)
                                }} />
                            </Col>
                            <Errors
                                className="text-danger"
                                model=".staffDoB"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    maxDate: 'Must be over 18 years old!',
                                }}
                            />
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="staffStartDate" md={5}>Ngày vào công ty</Label>
                            <Col md={7}>
                                <Control model=".staffStartDate" component={MyDateInput} id="staffStartDate" name="staffStartDate" className="form-control" value={newStaffStartDate} onChange={(e) => setNewStaffStartDate(e.target.value)} validators={{
                                    required, maxDate: maxDate(0)
                                }} />
                            </Col>
                            <Errors
                                className="text-danger"
                                model=".staffStartDate"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    maxDate: 'Must before today!',
                                }}
                            />
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="staffDepartment" md={5}>Phòng ban</Label>
                            <Col md={7}>
                                <Control.text model=".staffDepartment" id="staffDepartment" name="staffDepartment" className="form-control" value={newStaffDepartment} onChange={(e) => setNewStaffDepartment(e.target.value)} validators={{
                                    required, validateDepartment
                                }} />
                            </Col>
                            <Errors
                                className="text-danger"
                                model=".staffDepartment"
                                show="touched"
                                messages={{
                                    required: 'Required!',
                                    validateDepartment: 'This department is not available!'
                                }}
                            />
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="staffSalaryScale" md={5}>Hệ số lương</Label>
                            <Col md={7}>
                                <Control.text model=".staffSalaryScale" id="staffSalaryScale" name="staffSalaryScale" className="form-control" value={newStaffSalaryScale} onChange={(e) => setNewStaffSalaryScale(e.target.value)} validators={{
                                    required, minNumber: minNumber(0), maxNumber: maxNumber(10), isNumber
                                }} />
                            </Col>
                            <Errors
                                className="text-danger"
                                model=".staffSalaryScale"
                                show="touched"
                                messages={{
                                    required: 'Required!',
                                    minNumber: 'Must be a positive number!',
                                    maxNumber: 'Must not be greater than 10.0!',
                                    isNumber: 'Must be a number!'
                                }}
                            />
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="staffAnnualLeave" md={5}>Số ngày nghỉ còn lại</Label>
                            <Col md={7}>
                                <Control.text model=".staffAnnualLeave" id="staffAnnualLeave" name="staffAnnualLeave" className="form-control" value={newStaffAnnualLeave} onChange={(e) => setNewStaffAnnualLeave(e.target.value)} validators={{
                                    required, minNumber: minNumber(0), maxNumber: maxNumber(14), isNumber
                                }} />
                            </Col>
                            <Errors
                                className="text-danger"
                                model=".staffAnnualLeave"
                                show="touched"
                                messages={{
                                    required: 'Required!',
                                    minNumber: 'Must be a positive number of days!',
                                    maxNumber: 'Must be less than 14 days!',
                                    isNumber: 'Must be a number!'
                                }}
                            />
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="staffOverTime" md={5}>Số ngày đã làm thêm</Label>
                            <Col md={7}>
                                <Control.text model=".staffOverTime" id="staffOverTime" name="staffOverTime" className="form-control" value={newStaffOverTime} onChange={(e) => setNewStaffOverTime(e.target.value)} validators={{
                                    required, minNumber: minNumber(0), maxNumber: maxNumber(7), isNumber
                                }} />
                            </Col>
                            <Errors
                                className="text-danger"
                                model=".staffOverTime"
                                show="touched"
                                messages={{
                                    required: 'Required!',
                                    minNumber: 'Must be a positive number of days!',
                                    maxNumber: 'Must be less than 7 days!',
                                    isNumber: 'Must be a number!'
                                }}
                            />
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:10, offset: 5}}>
                                <Button type="submit" color="primary">Thêm</Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
    );    
}


export default StaffList;