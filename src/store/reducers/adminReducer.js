import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGetGender:false,
    genders: [],
    roles :[],
    positions :[],
    users:[],
    topDoctors:[],
    allDoctors:[],
    allScheduleHours:[],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state};
            copyState.isLoadingGetGender=true;
            return {
                ...copyState
                
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
                state.genders=action.data;
                state.isLoadingGetGender=false;
            return {
                ...state
                
            }                       
        case actionTypes.FETCH_GENDER_FAIDED:
            state.isLoadingGetGender=false;
            state.genders=[];
            return {
                ...state
                
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
                state.positions=action.data;
                
            return {
                ...state
                
            }   
        case actionTypes.FETCH_POSITION_FAIDED:
                state.positions=[];
                
            return {
                ...state
                
            }      
        case actionTypes.FETCH_ROLE_SUCCESS:
                state.roles=action.data;
                
            return {
                ...state
                
            }   
        case actionTypes.FETCH_ROLE_FAIDED:
                state.roles=[];
                
            return {
                ...state
                
            }
            case actionTypes.FETCH_ALL_USERS_SUCCESS:
                state.users=action.users;
                
            return {
                ...state
                
            }
            case actionTypes.FETCH_ALL_USERS_FAILDED:
                state.users=[];
                
            return {
                ...state
                
            }  
            case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
                state.topDoctors=action.dataDotors;
                
            return {
                ...state
                
            } 
            case actionTypes.FETCH_ALL_DOCTORS_FAILDED:
                state.topDoctors=[];
                
            return {
                ...state
                
            }    

            case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
                state.allDoctors=action.dataDr;
            return {
                ...state
                
            } 
            case actionTypes.FETCH_TOp_DOCTORS_FAILDED:
                state.allDoctors=[];
                
            return {
                ...state
                
            }



            case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS:
                state.allScheduleHours=action.dataTime;               
            return {
                ...state
                
            } 
            case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILDED:
                state.allScheduleHours=[];
            return {
                ...state
                
            }

       
        default:
            return state;
    }
}

export default adminReducer;