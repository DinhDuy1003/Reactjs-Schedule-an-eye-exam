import actionTypes from "./actionTypes";
import { getAllCodeService,createNewUserService,getAllUsers,
    deleteUserService,editUserService,getTopDoctorHomeService,getAllDoctors,saveDetaiDoctorservice
} from "../../services/userService";
import {toast} from "react-toastify";

export const fetchGenderStart=()=>{
    
    return async (dispatch, getState)=>{
        dispatch({type :actionTypes.FETCH_GENDER_START})
        try {
            let res= await getAllCodeService("GENDER");
            if(res && res.errCode === 0 ){
               
                dispatch(fetchGenderSucces(res.data))
            }else{
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error',e)
        }
    }
}

export const fetchGenderSucces=(genderData) => ({
    type :actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})

export const fetchGenderFailed=() => ({
    type :actionTypes.FETCH_GENDER_FAIDED,
    
})
export const fetchPositionSucces=(positionData) => ({
    type :actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})

export const fetchPositionFailed=() => ({
    type :actionTypes.FETCH_POSITION_FAIDED,
    
})
export const fetchRoleSucces=(roleData) => ({
    type :actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})

export const fetchRoleFailed=() => ({
    type :actionTypes.FETCH_ROLE_FAIDED,
    
})
export const fetchPositionStart=()=>{
    
    return async (dispatch, getState)=>{
       
        try {
            let res= await getAllCodeService("POSITION");
            if(res && res.errCode === 0 ){
               
                dispatch(fetchPositionSucces(res.data))
            }else{
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionSTART error',e)
        }
    }
}
export const fetchRoleStart=()=>{
    
    return async (dispatch, getState)=>{
       
        try {
            let res= await getAllCodeService("ROLE");
            if(res && res.errCode === 0 ){
               
                dispatch(fetchRoleSucces(res.data))
            }else{
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleSTART error',e)
        }
    }
}

export const createNewUser =(data) =>{
    return async (dispatch,getState) =>{
        try {
            let res =await createNewUserService(data);
            if(res && res.errCode === 0){
               toast.success("create a new user succeed")
               dispatch(saveUserSuccess())
               dispatch(fetchAllUsersStart());
            }else{
               dispatch(saveUserFailed());
            }
        } catch (e) {
           dispatch(saveUserFailed());
            console.log('saveUserFailed',e)
        }
    }
}

export const saveUserSuccess=()=>({
    type:actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed =() =>({
    type:actionTypes.CREATE_USER_FAILDED
})

export const fetchAllUsersStart=()=>{
    return async (dispatch,getState)=>{
        try {
            let res = await getAllUsers("ALL");
            // let res1 = await getTopDoctorHomeService(3);
            // console.log('duyeckdataaaaaa',res1);
            if(res && res.errCode === 0){
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            }else{
                toast.error("Fetch all users error")
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("Fetch all users error")
                dispatch(fetchAllUsersFailed());

                console.log('fetchAllUsersFailed error',e)
        }
    }
}

export const fetchAllUsersSuccess =(data) =>({
    type :actionTypes.FETCH_ALL_USERS_SUCCESS,
    users:data,
})

export const fetchAllUsersFailed =() =>({
    type :actionTypes.FETCH_ALL_USERS_FAILDED,
    
})

export const deleteAUsers =(userId) =>{
    return async (dispatch,getState) =>{
        try{
            let res = await deleteUserService(userId);
            if(res && res.errCode === 0){
                toast.success("delete a new user succeed");
                   dispatch(deleteUserSuccess());
                   dispatch(fetchAllUsersStart());
            }else{
                toast.error("delete a new user error");
                dispatch(deleteUserFailed());
    
            }
        }
       catch(e){
        toast.error("delete a new user error");
        dispatch(deleteUserFailed());
        console.log('saveUserFailed  erroe' ,e)
        }
    }
}

export const deleteUserSuccess=()=>({
    type :actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed=()=>({
    type :actionTypes.DETELE_USER_FAILDED
})

export const editAUser= (data) =>{
    return async (dispatch,getState)=>{
        try {
            let res = await editUserService(data);
            if(res && res.errCode === 0){
                toast.success("Updata a new user succeed");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                toast.error("Updata a new user error");               
                dispatch(editUserFailed()); 
            }
        } catch (e) {
            toast.error("Updata a new user error");               
            dispatch(editUserFailed()); 
            console.log('editUserFailed  error' ,e)
        }
       
    }
}

export const editUserSuccess=()=>({
    type :actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed=()=>({
    type :actionTypes.EDIT_USER_FAILDED
})

export const fetchTopDoctor= () =>{
    return async (dispatch,getState)=>{
        try {
            let res = await getTopDoctorHomeService('');
            console.log('duycheck data',res)
            if(res && res.errCode === 0){
                dispatch({
                    type:actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDotors:res.data
                })
                
            }else{
                dispatch({
                    type:actionTypes.FETCH_ALL_DOCTORS_FAILDED,
                   
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILDED',e)
            dispatch({
                type:actionTypes.FETCH_ALL_DOCTORS_FAILDED,
               
            })
        }
       
    }
}

export const fetchAllDoctor = () =>{
    return async (dispatch,getState)=>{
        try {
            let res = await getAllDoctors();
            console.log('duycheck data',res)
            if(res && res.errCode === 0){
                dispatch({
                    type:actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDr:res.data
                })
                
            }else{
                dispatch({
                    type:actionTypes.FETCH_TOP_DOCTORS_FAILDED,
                   
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILDED',e)
            dispatch({
                type:actionTypes.FETCH_TOP_DOCTORS_FAILDED,
               
            })
        }
       
    }
}

export const saveDetaiDoctors = (data) =>{
    return async (dispatch,getState)=>{
        try {
            let res = await saveDetaiDoctorservice(data);
            if(res && res.errCode === 0){
                toast.success("Save infor doctor succeed");
                dispatch({
                    type:actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
                })
            }else{
                toast.error("error infor doctor succeed");
                dispatch({
                    type:actionTypes.SAVE_DETAIL_DOCTORS_FAILDED,                  
                })
            }
        } catch (e) {
            toast.error("error infor doctor succeed");
            dispatch({
                type:actionTypes.SAVE_DETAIL_DOCTORS_FAILDED,
               
            })
        }
       
    }
}

export const fetchAllScheduleHours = () =>{
    return async (dispatch,getState)=>{
        try {
            let res= await getAllCodeService("TIME");
           
            if(res && res.errCode === 0){
                dispatch({
                    type:actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS,
                    dataTime:res.data
                })
                
            }else{
                dispatch({
                    type:actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILDED,
                   
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILDED',e)
            dispatch({
                type:actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILDED,
               
            })
        }
       
    }
}