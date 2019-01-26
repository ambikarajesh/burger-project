import axios from 'axios';



const instance = axios.create({
    baseURL:'https://ambika-burger-project.firebaseio.com/',
})

export default instance;