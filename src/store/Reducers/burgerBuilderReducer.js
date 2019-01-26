import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../../shared/Utility';
const INGCOST = {
    meat : 1.3,
    cheese : 0.4,
    salad : 0.3,
    bacon : 0.7
}

const initialState = {
    Ingredients:null,
    error:false,
    TotalPrice:4,
    building:false
}
const AddIngts = (state, action) => {
    const updateIngredients = updateObject(state.Ingredients, {[action.IngredientName] : state.Ingredients[action.IngredientName]  + 1});
    const updateState = updateObject(state,{Ingredients:updateIngredients,TotalPrice:state.TotalPrice + INGCOST[action.IngredientName], building:true})
    return updateState;
}

const RemoveIngts = (state,action) => {
    const updtIngredients = updateObject(state.Ingredients, {[action.IngredientName] : state.Ingredients[action.IngredientName]  - 1});
    const updtState = updateObject(state,{Ingredients:updtIngredients,TotalPrice:state.TotalPrice - INGCOST[action.IngredientName], building:true})
    return updtState;
}

const FetchIngts = (state,action) => {
    const updated = updateObject(state,{Ingredients:{
        salad: action.Ingredients.salad,
        bacon:action.Ingredients.bacon,
        cheese:action.Ingredients.cheese,
        meat:action.Ingredients.meat
    },                    
    TotalPrice:4,
    error:false})
    return updated;
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return AddIngts(state, action);
        case actionTypes.REMOVE_INGREDIENT: return RemoveIngts(state,action);
        case actionTypes.FETCH_INITIAL_INGREDIENTS_SUCCESS: return FetchIngts(state,action);            
        case actionTypes.FETCH_INITIAL_INGREDIENTS_FAIL: return updateObject(state,{error:true});
        default:
            return state
    }
}

export default reducer;