import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../../shared/Utility';
const initialState = {
    orders:[],
    loading:false,
    error:null,
    purchase:false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return updateObject(state,{purchase:false});
        case actionTypes.PURCHASE_START:
            return updateObject(state,{loading:true});
        case actionTypes.PURCHASE_SUCCESS:
            return updateObject(state,{loading:false, purchase:true,error:null});
        case actionTypes.PURCHASE_FAIL:
            return updateObject(state,{loading:false, error:action.error});
        case actionTypes.FETCH_ORDER_START:
            return updateObject(state,{loading:true});
        case actionTypes.FETCH_ORDER_SUCCESS:
            return updateObject(state, {orders:action.orders, loading:false, error:null});
        case actionTypes.FETCH_ORDER_FAIL:
            return updateObject(state, {loading:false, error:action.error});                
        default:
            return state
    }
}

export default reducer;