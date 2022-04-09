import React from "react";
import { Card, CardText, CardTitle } from 'reactstrap';

const DepartmentList = (props) => {

    const departmentlist = props.departments.map((department) => {
        return (
            <div key={department.id} className="col-12 col-sm-6 col-md-4">
                <Card>
                        <CardTitle>{department.name}</CardTitle>
                        <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
                </Card>
            </div>
        )
    });

    return (
        <div className="container">
            <div className="row">
                {departmentlist}
            </div>
        </div>
    );    
}

export default DepartmentList;