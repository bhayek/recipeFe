import http from './httpService';
import { getConfigs } from '../config';
import jwtDecode from 'jwt-decode';


const registerEndpoint = getConfigs().apiUrl + '/users/register'
const loginEndpoint = getConfigs().apiUrl + '/users/login'

export function register(user){
    return http.post(registerEndpoint,{
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender
    });
}

export async function login(user,redirect){
   const resp = await http.post(loginEndpoint,{
        email: user.email,
        password: user.password
    });
    const { token } = resp.data
    console.log(token)
    localStorage.setItem('jwt',token)
    window.location = redirect
}

export function loginWithJwt(token) {
    localStorage.setItem('jwt', token)
}

export function doLogout(redirect) {
    localStorage.removeItem('jwt')
    window.location = redirect;
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem('jwt')
        const { user } = jwtDecode(jwt);
        return user
    } catch (ex) {
        return null
    }
}

export function getJwt(){
    console.log(localStorage.getItem('jwt'))
    return localStorage.getItem('jwt')
}

export default {
    register,
    login,
    loginWithJwt,
    getCurrentUser,
    getJwt
}
