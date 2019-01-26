import React from 'react';
import classes from './Input.module.css';
const Input = (props) =>{
    let inputElement = null;
    switch(props.elementType){
        case 'input':{
            inputElement = <div>
                                <input className ={props.valid?classes.InputValid:classes.InputinValid} {...props.elementConfig} value = {props.value} onChange = {props.changed}/>                               
                            </div>
                        
            break;
        }
        case 'select':{
            inputElement = <select className ={props.valid?classes.InputValid:classes.InputinValid} onChange = {props.changed}>
                                {props.elementConfig.options.map(opt =>{
                                        return <option key = {opt.value} value = {opt.value}>{opt.disValue}</option>
                                })

                                }
                           </select>

                            
            break;
        }
        default:
            inputElement = null;
            break;
    }

    return(
        
        <div className ={classes.Input}>
            {inputElement}
        </div>
    )
}

export default Input;