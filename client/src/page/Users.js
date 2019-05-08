import React from 'react';
import { List, Datagrid, ShowButton, TextField, ArrayInput, BooleanInput, SimpleFormIterator, EmailField, BooleanField, NumberField, ReferenceField, DateField, EditButton } from 'react-admin';
import { Edit, Show, SimpleShowLayout, ArrayField, Create, SimpleForm, TextInput, NumberInput, ReferenceInput, DateInput, SelectInput } from 'react-admin'
import Schedule from '../component/Schedule'
import Select from 'react-select';
import Paper from '@material-ui/core/Paper';
import { UserType, FullName2 } from './customRa'

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <EmailField source="email" />
            <BooleanField source="active" />
            <FullName2 source="name" />
            <DateField source="dob" />
            <TextField source="gender" />
            <UserType source="userType" />
            <TextField source="qutId" />
            <TextField source="lastLogin" />
            <DateField source="createdAt" />
            <EditButton />
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>

            <BooleanInput source="active" />

        </SimpleForm>
    </Edit>
);


export const UserShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            {/*      <TextField source="id" /> */}
            <EmailField source="email" />
            <BooleanField source="active" />
            <FullName2 source="name" />
            <DateField source="dob" />
            <TextField source="gender" />
            <UserType source="userType" />
            <TextField source="qutId" />
            <TextField source="lastLogin" />
            <DateField source="createdAt" />

        </SimpleShowLayout>
    </Show>
);