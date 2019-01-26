import React from 'react';
import classes from './ToolBar.module.css';
import Logo from './Logo/Logo';
import ToggleButton from './ToggleButton/ToggleButton';
import NavItems from './NavItems/NavItems';
const ToolBar = (props) => {
    return(
        <div className = {classes.ToolBar}>
            <ToggleButton Clicked = {props.Click}/>
            <Logo height = '80%'/>
            <nav>
                <NavItems  isAuthenticated = {props.isAuthenticated}/>
            </nav>
        </div>
    );
}

export default ToolBar;