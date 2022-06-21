import http from './httpService';
import { getConfigs } from '../config';
import jwtDecode from 'jwt-decode';


const getGendersEndpoint = getConfigs().apiUrl + '/lookup/genders'


export function getGenders() {
    return http.get('/api/lookup/genders')
 }



export default {
    getGenders
}