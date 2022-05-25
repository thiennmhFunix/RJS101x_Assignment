import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

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

export const staffPost = (staff) => ({
	type: ActionTypes.STAFF_POST,
	payload: staff,
});

// export const staffPatch = (staff) => ({
// 	type: ActionTypes.STAFF_PATCH,
// 	payload: staff,
// });

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
		.then((staffs) => {
			var staffsfiltered = [];
			staffs.map((staff) => {
				if (staff.name.toLowerCase().includes(searchKey.toLowerCase()))
					return staffsfiltered.push(staff);
			});
			dispatch(staffsAdd(staffsfiltered));
		})
		.catch((error) => dispatch(staffsFailed(error.message)));
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
			.then((response) => dispatch(staffPost(response)))
			.catch((error) => {
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
		console.log(staffId + "dispatch");
		console.log(name + "dispatch");
		console.log(doB + "dispatch");

		return fetch(baseUrl + "staffs", {
			method: "PATCH",
			mode: "cors",
			//credentials: "include",
			body: JSON.stringify({
				name: name,
				doB: doB,
				startDate: startDate,
				departmentId: departmentId,
				salaryScale: salaryScale,
				annualLeave: annualLeave,
				overTime: overTime,
			}),
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "http://localhost:3000",
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Headers": "Content-Type",
			},
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
			.then((response) => {
				console.log(response);
				dispatch(staffPost(response));
			})
			.catch((error) => {
				console.log("Patch staffs", error.message);
			});
	};

export const deleteStaff = (staffId) => (dispatch) => {
	return fetch(baseUrl + "staffs/" + staffId, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
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
		.then((response) => {
			console.log(response);
			dispatch(staffsAdd(response));
		})
		.catch((error) => {
			console.log("Delete staffs", error.message);
		});
};
