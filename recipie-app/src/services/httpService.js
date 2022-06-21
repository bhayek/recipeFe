import axios from "axios";
import logger from './logService';
import { toast } from 'react-toastify';
import userService from './userService'

// console.log(userService.getJwt())
//axios.defaults.headers.common['x-auth-token'] = userService.getJwt();

// console.log('axios: ', axios.defaults.headers)


axios.interceptors.response.use(null, error => {
    const expectedError = 
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

    if (!expectedError) {
        logger.log(error);
        toast.effor("An unexpected error occured.");
    }

    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};
