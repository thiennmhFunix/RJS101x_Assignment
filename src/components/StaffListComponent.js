import React, { Component} from "react";
import { Card, CardText, CardTitle } from 'reactstrap';
import dateFormat from 'dateformat';

class StaffList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedStaff: null,
            btnMode: 1
        }
    }

    onStaffSelect(staff) {
        this.setState({ selectedStaff: staff})
    }

    onBtnClick(mode) {
        switch (mode) {
            case 1:
                this.setState({ btnMode: 2});
                break;
            case 2:
                this.setState({ btnMode: 3});
                break;
            case 3:
                this.setState({ btnMode: 1});
                break;
        }
            
    }

    settingButton() {
        return (
            <div width="100%">
                <div className="container-btn">
                    <i class="fa-solid fa-gear" onClick={() => this.onBtnClick(this.state.btnMode)}></i>
                </div>
            </div>
        )
    }

    modeInterface(mode) {
        if (mode == 1) {
            return ("col-12 col-sm-6 col-md-4 my-1");
        }
        else if (mode == 2) {
            return ("col-12 col-sm-6 col-md-2 my-1");
        }
        else  {
            return ("col-12 col-sm-6 col-md-6 my-1");
        }
    }

    renderStaff(staff) {
        if (staff != null) {
            return (
                <Card>
                    <CardTitle>Họ và tên: {staff.name}</CardTitle>
                    
                        <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Phòng ban: {staff.department.name}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>    
                </Card>
            );
        }
        else {
            return (
                <div><p>Bấm vào tên nhân viên để xem thông tin.</p></div>
            );
        }
    }

    render() {

        const stafflist = this.props.staffs.map((staff) => {
            return (
                <div key={staff.id} className={this.modeInterface(this.state.btnMode)}>
                    <Card onClick={() => this.onStaffSelect(staff)}>
                        <CardText>{staff.name}</CardText>
                    </Card>
                </div>
            )
        });

        return (
            <div className="container">
                <div className="row">
                    {this.settingButton()}
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