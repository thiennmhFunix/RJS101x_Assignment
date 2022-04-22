import React from "react";
import { CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

function RenderStaff(props) {
    if (props.staff != null) {
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <CardImg width="100%" src="/assets/images/vadonut.png" alt={props.staff.name} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <CardBody>
                        <CardTitle>Họ và tên: {props.staff.name}</CardTitle>
                        <CardText>Ngày sinh: {dateFormat(props.staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(props.staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Phòng ban: {props.staff.department.name}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {props.staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {props.staff.overTime}</CardText> 
                    </CardBody>
                </div>
            </div>
        );
    }
    else {
        return(
            <div></div>    
            );
        }
}

const StaffDetail = (props) => {

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/stafflist">Nhân viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <RenderStaff staff={props.staff} />
        </div>
    );
}


export default StaffDetail;