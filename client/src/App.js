import React from 'react';
import { Admin, Resource, ListGuesser, ShowGuesser, EditGuesser, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import authProvider from './authProvider';
import SERVER_DOMAIN from "./constants/server";
import loginPage from './page/login'
import customRoutes from './customRoutes';
import theme from './component/theme'
import Dashboard from './page/Dashboard';
import Personal from './page/Personal';

import { BookingList, BookingEdit, /* BookingCreate */ } from './page/Booking'
import BookingCreate from './page/BookingCreate'
import { FacultyEdit, FacultyCreate } from './page/Faculties'
import { UserList, UserEdit, UserShow } from "./page/Users"
import { MentorprogramList, MentorprogramEdit, MentorprogramShow, MentorprogramCreate } from './page/MentorProgram'
import { ExpertiseEdit, ExpertiseCreate } from './page/Expertises'
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

      permissions === 'Mentor'
        ? <Resource name="mentorPrograms" list={MentorprogramList} show={MentorprogramShow} edit={MentorprogramEdit} create={MentorprogramCreate} />
        : null,
      permissions === 'Mentor' || permissions === 'Entrepreneur'
        ? <Resource name="bookings" list={BookingList} show={ShowGuesser} edit={BookingEdit} create={BookingCreate} />
        : null,
      permissions === 'Mentor'
        ? <Resource name="faculties" show={ShowGuesser} edit={FacultyEdit} create={FacultyCreate} />
        : null,
      permissions === 'Mentor'
        ? <Resource name="expertises" show={ShowGuesser} edit={ExpertiseEdit} create={ExpertiseCreate} />
        : null,
      permissions === 'Mentor'
        ? <Resource name="availableTimes" create={AvailableTimeCreate} list={AvailableTimeRead} />
        : null,
      permissions === 'Admin'
        ? <Resource name="users" list={UserList} show={UserShow} edit={UserEdit} />
        : null,
      /*  <Resource name="users" list={ListGuesser} />, */
      permissions === 'Admin' || permissions === 'Mentor' || permissions === 'Entrepreneur'
        ? <Resource name="personal" list={Personal} />
        : null,

      <Resource name="login" />
    ]}


  </Admin>
);
export default App;