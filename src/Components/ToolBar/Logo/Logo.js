import React from 'react';
import classes from './Logo.module.css';
import burgerLogo from '../../../Assets/Images/burger-logo.png';

const Logo = (props) =>{
    return(
        <div className = {classes.Logo} style = {{height:props.height}}>
            <img src = {burgerLogo} alt ='Burger-Logo'/>
        </div>
    )
}

export default Logo;