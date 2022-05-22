import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchStaffs = () => (dispatch) => {
	dispatch(staffsLoading(true));

	return fetch(baseUrl + "staffs")
		.then(
			(response) => {
				if (response.ok) return response;
				else {
					var error = new Error(
						"Error " + response.status + ": " + response.statusText
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				var errmess = new Error(error.message);
				throw errmess;
			}
		)
		.then((response) => response.json())
		.then((staffs) => dispatch(staffsAdd(staffs)))
		.catch((error) => dispatch(staffsFailed(error.message)));
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

export const searchStaffs = (searchKey) => (dispatch) => {
	return fetch(baseUrl + "staffs")
		.then(
			(response) => {
				if (response.ok) return response;
				else {
					var error = new Error(
						"Error " + response.status + ": " + response.statusText
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				var errmess = new Error(error.message);
				throw errmess;
			}
		)
		.then((response) => response.json())
		.then((staffs) =>
			dispatch(
				staffsAdd(
					staffs.map((staff) =>
						staff.toLowerCase().includes(searchKey.toLowerCase())
					)
				)
			)
		)
		.catch((error) => dispatch(staffsFailed(error.message)));
};

export const postStaff = (name) => (dispatch) => {
	const newStaff = {
		name: name,
	};

	return fetch(baseUrl + "staffs", {
		method: "POST",
		body: JSON.stringify(newStaff),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "same-origin",
	})
		.then(
			(response) => {
				if (response.ok) return response;
				else {
					var error = new Error(
						"Error " + response.status + ": " + response.statusText
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				var errmess = new Error(error.message);
				throw errmess;
			}
		)
		.then((response) => response.json())
		.then((response) => dispatch(staffsAdd(response)))
		.catch((error) => {
			console.log("Post comments", error.message);
		});
};

export const fetchDepartments = () => (dispatch) => {
	dispatch(departmentsLoading(true));

	return fetch(baseUrl + "departments")
		.then(
			(response) => {
				if (response.ok) return response;
				else {
					var error = new Error(
						"Error " + response.status + ": " + response.statusText
					);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				var errmess = new Error(error.message);
				throw errmess;
			}
		)
		.then((response) => response.json())
		.then((departments) => dispatch(departmentsAdd(departments)))
		.catch((error) => dispatch(departmentsFailed(error.message)));
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
