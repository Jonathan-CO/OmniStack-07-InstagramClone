import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://10.0.3.2:3333' // genymotion
    baseURL: 'http://192.168.0.106:3333' //celular
})


export default api;