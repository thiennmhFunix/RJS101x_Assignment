import React, { Component} from "react";
import { Card, CardText, CardTitle } from 'reactstrap';

class StaffList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedStaff: null
        }
    }

    onStaffSelect(staff) {
        this.setState({ selectedStaff: staff})
    }

    renderStaff(staff) {
        if (staff != null) {
            return (
                <Card>
                    <CardTitle>Họ và tên: {staff.name}</CardTitle>
                    
                        <CardText>Ngày sinh: {staff.doB}</CardText>
                        <CardText>Ngày vào công ty: {staff.startDate}</CardText>
                        <CardText>Phòng ban: {staff.department.name}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>    
                </Card>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    render() {

        const stafflist = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onStaffSelect(staff)}>
                        <CardText>{staff.name}</CardText>
                    </Card>
                </div>
            )
        });

        return (
            <div className="container">
                <div className="row">
                    {stafflist}
                </div>
                <div className="row">
                    {this.renderStaff(this.state.selectedStaff)}
                </div>
            </div>

        );    

    }

}

export default StaffList;