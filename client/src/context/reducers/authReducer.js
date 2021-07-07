import { CONST } from "./authConstants";

export const authReducer = (state,action) => {
    switch (action.type) {
        case CONST.LOGIN:
            return{
                ...state,
                user:action.payload
            }
        case CONST.LOGOUT:
            return{
                ...state,
                user:null
            }    
        default:
            return state;
    }
}