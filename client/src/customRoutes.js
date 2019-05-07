import React from 'react';
import { Route } from 'react-router-dom';
import login from "./page/login";
import RegisterEmail from "./page/RegisterEmail";
import Register from "./page/Register";
import Home from './page/base/Home'

export default [
    <Route exact path="/register-email" component={RegisterEmail} noLayout />,
    <Route exact path="/register" component={Register} noLayout />,
    <Route exact path="/home" component={Home} noLayout />,
    /*     <Route exact path="/no-access" noLayout />, */
];