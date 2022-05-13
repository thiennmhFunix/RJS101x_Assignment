import { DEPARTMENTS, ROLE, STAFFS } from "../shared/staffs";

export const initialState = {
    departments: DEPARTMENTS,
    role: ROLE,
    staffs: STAFFS
};

export const Reducer = (state = initialState, action) => {
    return state;
}