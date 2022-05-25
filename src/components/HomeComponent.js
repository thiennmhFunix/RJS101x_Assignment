import React from "react";
import FormPostStaff from "./FormPostStaffComponent";
import FormSearchStaff from "./FormSearchStaffComponent";
import StaffList from "./StaffListComponent";
import { Loading } from "./LoadingComponent";

const Home = (props) => {
	const { staffs, searchStaffs, postStaff, departments } = props;

	if (staffs.isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />;
				</div>
			</div>
		);
	} else if (staffs.errMess) {
		return (
			<div className="container">
				<div className="row">
					<h4>{staffs.errMess}</h4>;
				</div>
			</div>
		);
	} else {
		return (
			<div className="container">
				<div className="row">
					<h3 className="col-9 col-sm-4">Nhân viên</h3>
					<FormPostStaff
						staffs={staffs}
						departments={departments}
						postStaff={postStaff}
					/>
					<FormSearchStaff searchStaffs={searchStaffs} />
					<hr />
				</div>

				<div className="row">
					<StaffList staffs={staffs.staffs} />
				</div>
			</div>
		);
	}
};

export default Home;
