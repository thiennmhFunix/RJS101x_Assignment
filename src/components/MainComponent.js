import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import StaffDetail from "./StaffDetailComponent";
import DeparmentList from "./DepartmentListComponent";
import SalaryList from "./SalaryListComponent";
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
	fetchStaffs,
	searchStaffs,
	fetchDepartments,
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
		staffs: state.staffs,
		departments: state.departments,
	};
};

const mapDispatchToProps = (dispatch) => ({
	fetchStaffs: () => {
		dispatch(fetchStaffs());
	},
	searchStaffs: (searchKey) => {
		dispatch(searchStaffs(searchKey));
	},
	fetchDepartments: () => {
		dispatch(fetchDepartments());
	},
});

class Main extends Component {
	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		newstaff: {},
	// 	};

	// 	this.saveNewStaff = this.saveNewStaff.bind(this);
	// }

	componentDidMount() {
		this.props.fetchStaffs();
		this.props.fetchDepartments();
	}

	// saveNewStaff(formValues) {
	// 	this.setState({
	// 		newstaff: { ...formValues },
	// 	});
	// }

	render() {
		const StaffWithId = () => {
			const params = useParams();

			return (
				<StaffDetail
					staff={
						this.state.staffs.filter(
							(staff) => staff.id === parseInt(params.staffId, 10)
						)[0]
					}
					isLoading={this.props.staffs.isLoading}
					errMess={this.props.staffs.errMess}
				/>
			);
		};

		// const NewStaff = () => {
		// 	return <StaffDetail staff={this.state.newstaff} />;
		// };

		return (
			<div>
				<Header />
				<Routes>
					<Route
						exact
						path="stafflist"
						element={
							<Home
								staffs={this.state.staffs}
								// savenewstaff={this.saveNewStaff}
								departments={this.state.departments}
								staffsLoading={this.props.staffs.isLoading}
								staffsErrMess={this.props.staffs.errMess}
								searchStaffs={this.props.searchStaffs}
							/>
						}
					/>
					{/* <Route path="stafflist/:staffId" element={<StaffWithId />} /> */}
					{/* <Route path="stafflist/101" element={<NewStaff />} /> */}
					<Route
						exact
						path="departmentlist"
						element={
							<DeparmentList
								departments={this.state.departments}
								departmentsLoading={this.props.departments.isLoading}
								departmentsErrMess={this.props.departments.errMess}
							/>
						}
					/>
					<Route
						exact
						path="salarylist"
						element={<SalaryList staffs={this.state.staffs} />}
					/>
					<Route path="*" element={<Navigate to="/stafflist" replace />} />
				</Routes>
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
