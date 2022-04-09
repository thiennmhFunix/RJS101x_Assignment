import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import StaffDetail from './StaffDetailComponent';
import DeparmentList from './DepartmentListComponent';
import SalaryList from './SalaryListComponent';
import { STAFFS } from '../shared/staffs';
import { DEPARTMENTS } from '../shared/staffs';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';


class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            staffs: STAFFS,
            departments: DEPARTMENTS
        };
    }

    render() {

        const StaffWithId = () => {

            const params = useParams();

            return (
                <StaffDetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(params.staffId, 10))[0]}  />
            );
        }

        return (
            <div>
                <Header />
                <Routes>
                    <Route exact path="stafflist" element={<StaffList staffs={this.state.staffs} />} />
                    <Route path="stafflist/:staffId" element={<StaffWithId />} />
                    <Route exact path="departmentlist" element={<DeparmentList departments={this.state.departments} />} />
                    <Route exact path="salarylist" element={<SalaryList staffs={this.state.staffs} />} />
                    <Route path="*" element={<Navigate to="/stafflist" replace />} />
                </Routes>
                <Footer />
            </div>
        )
    }
}

export default Main;