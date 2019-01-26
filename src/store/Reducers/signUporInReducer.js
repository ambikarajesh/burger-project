import * as actionTypes from '../Actions/actionTypes';
import {updateObject } from '../../shared/Utility';

const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:false,
    setAuthPath:'/'
}

const singUporInReducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.SIGNUPORIN_START: return updateObject(state,{ error:null, loading:true});                
        case actionTypes.SIGNUPORIN_SUCCESS: return updateObject(state, {token:action.token, userId:action.userId, error:null, loading:false});            
        case actionTypes.SIGNUPORIN_FAIL: return updateObject(state, {error:action.error, loading:false});            
        case actionTypes.LOGOUT: return updateObject(state, {token:null, userId:null, error:null, loading:false, setAuthPath:'/'});            
        case actionTypes.SET_AUTH_PATH: return updateObject(state, {setAuthPath:action.path});
        default:
            return state;
    }
}
export default singUporInReducer;