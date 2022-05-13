import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import StaffDetail from './StaffDetailComponent';
import DeparmentList from './DepartmentListComponent';
import SalaryList from './SalaryListComponent';
import { STAFFS } from '../shared/staffs';
import { DEPARTMENTS } from '../shared/staffs';
import { Routes, Route, Navigate, useParams, useLocation, useNavigate } from 'react-router-dom';
import { connect } from "react-redux";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
}

const mapStateToProps = state => {
    return {
        departments: state.departments,
        role: state.role,
        staffs: state.staffs
    }
}

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            staffs: STAFFS,
            departments: DEPARTMENTS,
            newstaff: {}
        };

        this.saveNewStaff = this.saveNewStaff.bind(this);
    }
    
    saveNewStaff(formValues) {
        
        this.setState({
            newstaff: { ...formValues }
        });

    }
    
    render() {
        

        const StaffWithId = () => {

            const params = useParams();

            return (
                <StaffDetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(params.staffId, 10))[0]}  />
            );
        }

        const NewStaff = () => {

            return (
                <StaffDetail staff={this.state.newstaff}  />
            );
        }

        return (
            <div>
                <Header />
                <Routes>
                    <Route exact path="stafflist" element={<StaffList staffs={this.state.staffs} savenewstaff={this.saveNewStaff} departments={this.state.departments} />} />
                    <Route path="stafflist/:staffId" element={<StaffWithId />} />
                    <Route path="stafflist/101" element={<NewStaff />} />
                    <Route exact path="departmentlist" element={<DeparmentList departments={this.state.departments} />} />
                    <Route exact path="salarylist" element={<SalaryList staffs={this.state.staffs} />} />
                    <Route path="*" element={<Navigate to="/stafflist" replace />} />
                </Routes>
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps)(Main));;