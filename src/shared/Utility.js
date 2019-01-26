export const updateObject = (oldObject, updateValue) => {
    return {
        ...oldObject,
        ...updateValue
    };
}

export const checkvalidity = (id, value) => {
    const zipCode = /^\d{5}$/;
    switch(id){
        case 'email':
               return (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))!==null;            
        case 'password':
               return value.length > 5 && value.length < 11;
        case 'name':
               return value.length >=5;
        case 'street':
                return value.length > 10
        case 'zipCode':
                return zipCode.test(value);
        default:
                return false;
    }
}

export const formValidity =  (stateObject) =>{
    const result = Object.keys(stateObject).every(key => {
        return stateObject[key].valid !== false
    })    
    return result       
} 