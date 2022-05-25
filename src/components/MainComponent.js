import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import StaffDetail from "./StaffDetailComponent";
import DepartmentDetail from "./DepartmentDetailComponent";
import DeparmentList from "./DepartmentListComponent";
import SalaryList from "./SalaryListComponent";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
	Routes,
	Route,
	Navigate,
	useParams,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { connect } from "react-redux";
import {
	fetchDepartments,
	fetchStaffs,
	searchStaffs,
	postStaff,
	patchStaff,
	deleteStaff,
} from "../redux/ActionCreators";

function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return (
			<Component
				{...props}
				router={{ location, navigate, params }}
				location={location}
			/>
		);
	}

	return ComponentWithRouterProp;
}

const mapStateToProps = (state) => {
	return {
		departments: state.departments,
		staffs: state.staffs,
	};
};

const mapDispatchToProps = (dispatch) => ({
	fetchDepartments: () => {
		dispatch(fetchDepartments());
	},
	fetchStaffs: () => {
		dispatch(fetchStaffs());
	},
	searchStaffs: (searchKey) => {
		dispatch(searchStaffs(searchKey));
	},
	postStaff: (
		name,
		doB,
		startDate,
		departmentId,
		salaryScale,
		annualLeave,
		overTime
	) => {
		dispatch(
			postStaff(
				name,
				doB,
				startDate,
				departmentId,
				salaryScale,
				annualLeave,
				overTime
			)
		);
	},
	patchStaff: (
		staffId,
		name,
		doB,
		startDate,
		departmentId,
		salaryScale,
		annualLeave,
		overTime
	) => {
		dispatch(
			patchStaff(
				staffId,
				name,
				doB,
				startDate,
				departmentId,
				salaryScale,
				annualLeave,
				overTime
			)
		);
	},
	deleteStaff: (staffId) => {
		dispatch(deleteStaff(staffId));
	},
});

class Main extends Component {
	componentDidMount() {
		this.props.fetchDepartments();
		this.props.fetchStaffs();
	}

	render() {
		const StaffWithId = () => {
			const params = useParams();

			return (
				<StaffDetail
					staff={
						this.props.staffs.staffs.filter(
							(staff) => staff.id === parseInt(params.staffId, 10)
						)[0]
					}
					isLoading={this.props.staffs.isLoading}
					errMess={this.props.staffs.errMess}
					departments={this.props.departments}
					patchStaff={this.props.patchStaff}
					deleteStaff={this.props.deleteStaff}
				/>
			);
		};

		const DepartmentWithId = () => {
			const params = useParams();

			return (
				<DepartmentDetail
					department={
						this.props.departments.departments.filter(
							(department) => department.name === params.departmentName
						)[0]
					}
					isLoading={this.props.departments.isLoading}
					errMess={this.props.departments.errMess}
					staffs={this.props.staffs}
				/>
			);
		};

		return (
			<div>
				<Header />
				<TransitionGroup>
					<CSSTransition
						key={this.props.location.key}
						classNames="page"
						timeout={300}
					>
						<Routes>
							<Route
								exact
								path="stafflist"
								element={
									<Home
										departments={this.props.departments}
										staffs={this.props.staffs}
										searchStaffs={this.props.searchStaffs}
										postStaff={this.props.postStaff}
									/>
								}
							/>
							<Route path="stafflist/:staffId" element={<StaffWithId />} />
							<Route
								exact
								path="departmentlist"
								element={
									<DeparmentList
										departments={this.props.departments}
										isLoading={this.props.departments.isLoading}
										errMess={this.props.departments.errMess}
									/>
								}
							/>
							<Route
								path="departmentlist/:departmentName"
								element={<DepartmentWithId />}
							/>
							<Route
								exact
								path="salarylist"
								element={<SalaryList staffs={this.props.staffs} />}
							/>
							<Route path="*" element={<Navigate to="/stafflist" replace />} />
						</Routes>
					</CSSTransition>
				</TransitionGroup>
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
