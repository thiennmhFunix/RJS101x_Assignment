import React from "react";
import { Card, CardImg, CardText, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

const StaffList = (props) => {

    const stafflist = props.staffs.map((staff) => {
        return (
            <div key={staff.id} className="col-6 col-sm-4 col-md-2">
                <Card>
                    <Link to={`/stafflist/${staff.id}`} >
                        <CardImg width="100%" src="assets/images/alberto.png" alt={staff.name} />
                        <CardText>{staff.name}</CardText>
                    </Link>
                </Card>
            </div>
        )
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3>Nhân viên</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                {stafflist}
            </div>
        </div>
    );    
}

export default StaffList;