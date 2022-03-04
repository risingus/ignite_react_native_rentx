import axios from 'axios';


export const api = axios.create({
  baseURL: 'http://10.203.0.123:3333'
})
