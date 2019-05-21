import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_GET_PERMISSIONS, AUTH_ERROR } from 'react-admin';
import SERVER_DOMAIN from "./constants/server";
const jwtDecode = require("jwt-decode");

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        console.log("AUTH_LOGIN");
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
                localStorage.setItem('token', token);

            });
    }
    if (type === AUTH_ERROR) {
        console.log("AUTH_ERROR");
        const status = params.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        console.log("AUTH_CHECK");

        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject({ redirectTo: '/home' });
    }

    if (type === AUTH_GET_PERMISSIONS) {
        console.log("AUTH_GET_PERMISSIONS");
        if (localStorage.getItem("token") !== null) {
            const role = jwtDecode(localStorage.getItem("token")).userType;
            return Promise.resolve(role);
        }
        else {

            Promise.reject({ redirectTo: '/home' })
        }
    }
    if (type === AUTH_LOGOUT) {
        console.log("AUTH_LOGOUT");
        localStorage.removeItem('token');
        return Promise.resolve();
    }

    return Promise.resolve();
}