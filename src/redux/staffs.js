import * as ActionTypes from "./ActionTypes";

export const Staffs = (
	state = {
		isLoading: true,
		errMess: null,
		staffs: [],
	},
	action
) => {
	switch (action.type) {
		case ActionTypes.STAFFS_ADD:
			return {
				...state,
				isLoading: false,
				errMess: null,
				staffs: action.payload,
			};

		case ActionTypes.STAFFS_LOADING:
			return { ...state, isLoading: true, errMess: null, staffs: [] };

		case ActionTypes.STAFFS_FAILED:
			return {
				...state,
				isLoading: false,
				errMess: action.payload,
				staffs: [],
			};

		case ActionTypes.STAFF_POST:
			var staff = action.payload;
			return { ...state, staffs: state.staffs.concat(staff) };

		// case ActionTypes.STAFF_PATCH:
		// 	var staff = action.payload;
		// 	var id = staff.id;
		// 	var index = state.staffs.indexOf(
		// 		state.staffs.filter((staff) => staff.id === id)[0]
		// 	);
		// 	return {
		// 		...state,
		// 		staffs: state.staffs.splice(index, 1).splice(index, 0, staff),
		// 	};

		default:
			return state;
	}
};
