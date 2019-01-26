import React from 'react';
import classes from './EachOrder.module.css';

const EachOrder = (props) => {
        const Ingredients =  Object.keys(props.Ingredients).map((Ingredient,i)=>{ 
               return <span key= {i} > {Ingredient+':'+props.Ingredients[Ingredient] + ' '}</span>
        })
        return(
            <div className = {classes.EachOrder}> 
                <p><strong>Ingredients:  </strong>  {Ingredients}</p>
                <p><strong>Price:  </strong> ${props.price.toFixed(2)}</p>
            </div>
        )
    
}

export default EachOrder;
