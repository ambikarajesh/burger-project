import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const AddIngredient = (IngredientName) =>{
    return {
        type:actionTypes.ADD_INGREDIENT, 
        IngredientName:IngredientName
    }
}

export const RemoveIngredient = (IngredientName) =>{
    return {
        type:actionTypes.REMOVE_INGREDIENT, 
        IngredientName:IngredientName
    }
}


export const FetchInitialIngredientsSuccess = (Ingredients) =>{
    return {
        type:actionTypes.FETCH_INITIAL_INGREDIENTS_SUCCESS,
        Ingredients:Ingredients
    }
}

export const FetchInitialIngredientsFail = (error) =>{
    return {
        type:actionTypes.FETCH_INITIAL_INGREDIENTS_FAIL,
        error:error
    }
}
export const FetchInitialIngredients = () =>{
    return dispatch => {           
        axios.get('https://react-my-burger-project-e147b.firebaseio.com/Ingredients.json').then(response =>{
            dispatch(FetchInitialIngredientsSuccess(response.data))
        }).catch(error => {
            dispatch(FetchInitialIngredientsFail(error))
        })
    }
}

