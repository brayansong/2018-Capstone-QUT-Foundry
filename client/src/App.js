import React from 'react';
import { Admin, Resource, ListGuesser, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import authProvider from './authProvider';
import SERVER_DOMAIN from "./constants/server";
import loginPage from './page/login'
import customRoutes from './customRoutes';
import theme from './component/theme'

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
}
const dataProvider = jsonServerProvider(SERVER_DOMAIN, httpClient);
const App = () => (
  <Admin
    dataProvider={dataProvider}
    loginPage={loginPage}
    customRoutes={customRoutes}
    authProvider={authProvider}
    theme={theme}>

    <Resource name="users" list={ListGuesser} />
  </Admin>
);
export default App;