import React from 'react';
import { Admin, Resource, ListGuesser, ShowGuesser, EditGuesser, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import authProvider from './authProvider';
import SERVER_DOMAIN from "./constants/server";
import loginPage from './page/login'
import customRoutes from './customRoutes';
import theme from './component/theme'
import Dashboard from './page/Dashboard';
import { BookingList, BookingEdit } from './page/Booking'
import AvailableTimeCreate from './page/availableTimes/Create'
import AvailableTimeRead from './page/availableTimes/Read'

import Account from './page/Account'


const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
}
const dataProvider = jsonServerProvider(SERVER_DOMAIN + "/api", httpClient);
const App = () => (
  <Admin
    dataProvider={dataProvider}
    loginPage={loginPage}
    customRoutes={customRoutes}
    authProvider={authProvider}
    theme={theme}
    dashboard={Dashboard}
  >


    {permissions => [

      permissions === 'Admin'
        ? <Resource name="users" list={ListGuesser} />
        : null,

      permissions === 'Mentor'
        ? <Resource name="bookings" list={BookingList} show={ShowGuesser} edit={BookingEdit} />
        : null,
      permissions === 'Mentor'
        ? <Resource name="availableTimes" create={AvailableTimeCreate} list={AvailableTimeRead} />
        : null,
      permissions === 'Admin'
        ? <Resource name="users" list={ListGuesser} />
        : null,
      /*  <Resource name="users" list={ListGuesser} />, */
      permissions === 'Admin' || permissions === 'Mentor' || permissions === 'Member'
        ? <Resource name="personal" list={ListGuesser} />
        : null,

      <Resource name="login" />
    ]}


  </Admin>
);
export default App;