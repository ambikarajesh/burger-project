import React from 'react';
import classes from './SideBar.module.css';
import BackDrop from '../UI/Modal/BackDrop/BackDrop';
import NavItems from '../ToolBar/NavItems/NavItems';

const SideBar = (props) => {  
    const assignClasses = props.show ? [classes.SideBar, classes.Open] : [classes.SideBar, classes.Close] 
    const style = {display:props.show ? 'block' : 'none'}
    return(
        <div className = {classes.MobileOnly}>
            <BackDrop show = {props.show} Clicked = {props.Click}/>
            <div className = {assignClasses.join(' ')} style = {style}> 
                <nav>
                    <NavItems  isAuthenticated = {props.isAuthenticated} Clicked = {props.Click}/>
                </nav>
            </div>
        </div>        
    )
}

export default SideBar;