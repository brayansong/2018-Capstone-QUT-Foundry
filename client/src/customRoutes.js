import React from 'react';
import { Route } from 'react-router-dom';
import login from "./page/login";
import RegisterEmail from "./page/RegisterEmail";

export default [
    <Route exact path="/register-email" component={RegisterEmail} noLayout />,
];