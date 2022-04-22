import React, { Component } from "react";
import { Card, CardImg, CardText, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

class StaffList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            searchKey: ""
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSearch(event) {
        this.setState({
            searchKey: this.searchname.value
        })
        event.preventDefault();
    }

    handleAdd(event) {
        
    }
    
    render() {

        // StaffList UI
        const stafflist = this.props.staffs.map(staff => {
            if (this.state.searchKey == "") {
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
            else if (this.state.searchKey != "") {
                if (staff.name.includes(this.state.searchKey)) {
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
            }   
        });

        return (
            <div className="container">
                <div className="row">
                    <h3 className="col-9 col-sm-4">Nhân viên</h3>

                    {/* Add Staff UI */}
                    <Button outline onClick={this.toggleModal}className="col-2 col-sm-1">
                        <span className="fa fa-solid fa-plus"></span>
                    </Button>

                    {/* Search Staff UI */}
                    <Form onSubmit={this.handleSearch} className="col-12 col-sm-5">
                        <div className="row">
                            <FormGroup className="col-9">
                                <Input type="text" id="searchname" name="searchname" innerRef={(input) => this.searchname = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary" className="col-2 col-sm-3">Tìm</Button>
                        </div>
                    </Form>
                    <hr /> 
                </div>

                {/* Menu StaffList */}
                <div className="row">
                    {stafflist}
                </div>

                {/* Modal Add Staff */}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={this.handleAdd}>
                            <FormGroup>
                                <Label htmlFor="staffname">Tên </Label>
                                <Input type="text" id="staffname" name="staffname" innerRef={(input) => this.staffname = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="staffdoB">Ngày sinh</Label>
                                <Input type="text" id="staffdoB" name="staffdoB" innerRef={(input) => this.staffdoB = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="staffStartDate">Ngày vào công ty</Label>
                                <Input type="text" id="staffStartDate" name="staffStartDate" innerRef={(input) => this.staffStartDate = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="staffDepartment">Phòng ban</Label>
                                <Input type="text" id="staffDepartment" name="staffDepartment" innerRef={(input) => this.staffDepartment = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="staffSalaryScale">Hệ số lương</Label>
                                <Input type="text" id="staffSalaryScale" name="staffSalaryScale" innerRef={(input) => this.staffSalaryScale = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="staffAnnualLeave">Số ngày nghỉ còn lại</Label>
                                <Input type="text" id="staffAnnualLeave" name="staffAnnualLeave" innerRef={(input) => this.staffAnnualLeave = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="staffOverTime">Số ngày đã làm thêm</Label>
                                <Input type="text" id="staffOverTime" name="staffOverTime" innerRef={(input) => this.staffOverTime = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Thêm</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );    
    }
}

export default StaffList;