import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_GET_PERMISSIONS, AUTH_ERROR } from 'react-admin';
import SERVER_DOMAIN from "./constants/server";
const jwtDecode = require("jwt-decode");

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request(SERVER_DOMAIN + '/api/login/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                const decodedToken = jwtDecode(token);
                console.log("jwtDecode")
                console.log(decodedToken)

                localStorage.setItem('token', token);
                localStorage.setItem('userType', decodedToken.userType);

            });
    }
    if (type === AUTH_ERROR) {
        const status = params.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject({ redirectTo: '/login' });
    }

    if (type === AUTH_GET_PERMISSIONS) {
        console.log("i am hereree");
        const role = localStorage.getItem("userType");
        return Promise.resolve(role);
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        localStorage.removeItem("userType");
        return Promise.resolve();
    }

    return Promise.resolve();
}