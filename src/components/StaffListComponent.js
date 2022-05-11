import React, { useState } from "react";
import { Card, CardImg, CardText, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
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

    const stafflistmenu = staffs.map(staff => {
        if (staff.name.includes(searchStaff)) {
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
        if (localStorage.getItem('newStaffName').includes(searchStaff)) {
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
                            <Input type="text" id="staffName" name="staffName" value={newStaffName} onChange={(e) => setNewStaffName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="staffDoB">Ngày sinh</Label>
                            <Input type="date" id="staffDoB" name="staffDoB" value={newStaffDoB} onChange={(e) => setNewStaffDoB(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="staffStartDate">Ngày vào công ty</Label>
                            <Input type="date" id="staffStartDate" name="staffStartDate" value={newStaffStartDate} onChange={(e) => setNewStaffStartDate(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="staffDepartment">Phòng ban</Label>
                            <Input type="text" id="staffDepartment" name="staffDepartment" value={newStaffDepartment} onChange={(e) => setNewStaffDepartment(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="staffSalaryScale">Hệ số lương</Label>
                            <Input type="text" id="staffSalaryScale" name="staffSalaryScale" value={newStaffSalaryScale} onChange={(e) => setNewStaffSalaryScale(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="staffAnnualLeave">Số ngày nghỉ còn lại</Label>
                            <Input type="text" id="staffAnnualLeave" name="staffAnnualLeave" value={newStaffAnnualLeave} onChange={(e) => setNewStaffAnnualLeave(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="staffOverTime">Số ngày đã làm thêm</Label>
                            <Input type="text" id="staffOverTime" name="staffOverTime" value={newStaffOverTime} onChange={(e) => setNewStaffOverTime(e.target.value)} />
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Thêm</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );    
}


export default StaffList;