import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import axios from "axios";

export const fetchDepartments = () => (dispatch) => {
	dispatch(departmentsLoading(true));

	return axios
		.get(baseUrl + "departments")
		.then(function (departments) {
			dispatch(departmentsAdd(departments.data));
		})
		.catch(function (error) {
			dispatch(departmentsFailed(error.message));
		});
};

export const departmentsLoading = () => ({
	type: ActionTypes.DEPARTMENTS_LOADING,
});

export const departmentsFailed = (errmess) => ({
	type: ActionTypes.DEPARTMENTS_FAILED,
	payload: errmess,
});

export const departmentsAdd = (departments) => ({
	type: ActionTypes.DEPARTMENTS_ADD,
	payload: departments,
});

export const fetchStaffs = () => (dispatch) => {
	dispatch(staffsLoading(true));

	return axios
		.get(baseUrl + "staffs")
		.then(function (staffs) {
			dispatch(staffsAdd(staffs.data));
		})
		.catch(function (error) {
			dispatch(staffsFailed(error.message));
		});
};

export const staffsLoading = () => ({
	type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errmess) => ({
	type: ActionTypes.STAFFS_FAILED,
	payload: errmess,
});

export const staffsAdd = (staffs) => ({
	type: ActionTypes.STAFFS_ADD,
	payload: staffs,
});

export const staffPost = (staff) => ({
	type: ActionTypes.STAFF_POST,
	payload: staff,
});

export const searchStaffs = (searchKey) => (dispatch) => {
	return axios
		.get(baseUrl + "staffs")
		.then((staffs) => {
			var staffsfiltered = [];
			staffs.data.map((staff) => {
				if (staff.name.toLowerCase().includes(searchKey.toLowerCase()))
					return staffsfiltered.push(staff);
			});
			dispatch(staffsAdd(staffsfiltered));
		})
		.catch(function (error) {
			dispatch(staffsFailed(error.message));
		});
};

export const postStaff =
	(name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) =>
	(dispatch) => {
		const newStaff = {
			name: name,
			doB: doB,
			startDate: startDate,
			departmentId: departmentId,
			salaryScale: salaryScale,
			annualLeave: annualLeave,
			overTime: overTime,
			image: "/assets/images/vadonut.png",
			salary: 3600000,
		};

		return axios
			.post(baseUrl + "staffs", newStaff)
			.then(function (staff) {
				dispatch(staffPost(staff.data));
			})
			.catch(function (error) {
				console.log("Post staffs", error.message);
			});
	};

export const patchStaff =
	(
		staffId,
		name,
		doB,
		startDate,
		departmentId,
		salaryScale,
		annualLeave,
		overTime
	) =>
	(dispatch) => {
		return axios
			.patch(baseUrl + "staffs/" + staffId, {
				name: name,
				doB: doB,
				startDate: startDate,
				departmentId: departmentId,
				salaryScale: salaryScale,
				annualLeave: annualLeave,
				overTime: overTime,
			})
			.then((response) => {
				dispatch(staffPost(response));
			})
			.catch(function (error) {
				console.log("Patch staffs", error.message);
			});
	};

export const deleteStaff = (staffId) => (dispatch) => {
	return axios
		.delete(baseUrl + "staffs/" + staffId)
		.then((response) => {
			dispatch(staffsAdd(response.data));
		})
		.catch(function (error) {
			console.log("Delete staffs", error.message);
		});
};
