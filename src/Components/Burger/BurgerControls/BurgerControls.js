import React from 'react';
import classes from './BurgerControls.module.css';
import BurgerControl from './BurgerControl/BurgerControl';
import Button from '../../Button/Button';
const BurgerControls = (props) => {
    const IngredientsList = Object.keys(props.Ingredients).map((Ingredient,i) =>{
        return <BurgerControl label = {Ingredient} 
                              key = {Ingredient+i} 
                              Added = {() => props.Add(Ingredient)} 
                              Removed = {() => props.Remove(Ingredient)}
                              disabled = {props.disableIngredients[Ingredient]}/>
    });
    
    return(
        <div className = {classes.BurgerControls}>
            <div className = {classes.Price}>Total Price :<strong style = {{color:'red'}}> ${props.Price.toFixed(2)}</strong> </div>
           {IngredientsList}
           <Button btnType = {props.disable ? 'AuthIn' : null} clicked = {props.clicked}  disabled = {!props.disable}>ORDER NOW</Button>
        </div>
    )
}

export default BurgerControls;