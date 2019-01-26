import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';
const NavItems  = (props) => {
    return(
        <ul className = {classes.NavItems} onClick = {props.Clicked}>
            <NavItem link = '/' exact >Burger Builder</NavItem>
            {props.isAuthenticated ? <NavItem link = '/order'>Order</NavItem> :null}
            {!props.isAuthenticated
             ? <NavItem link = '/signin'>SignIn</NavItem>
             : <NavItem link = '/logout'>Logout</NavItem>
            }
        </ul>
    )
}

export default NavItems;
