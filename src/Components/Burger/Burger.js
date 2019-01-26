import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';
const Burger = (props) => {
    let transIngredients = null;
    if(props.Ingredients){
        transIngredients = Object.keys(props.Ingredients).map(Ingredient => {
            return [...Array(props.Ingredients[Ingredient])].map((_,i)=>{
                return <BurgerIngredient key = {Ingredient+i} type = {Ingredient}/>
            })
        }).reduce((total,current) => {
            return total.concat(current)
        })
       if(transIngredients.length === 0 ){
            transIngredients = <p>--- Please select Ingredients ---</p>;
        }
    }
    

    return(
        <div className = {classes.Burger}>
            <BurgerIngredient type = 'bread-top'/>
            {transIngredients}
            <BurgerIngredient type = 'bread-bottom'/>
        </div>
    )
}

export default Burger;