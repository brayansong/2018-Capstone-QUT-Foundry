import React from 'react';
import { List, Datagrid, TextField, NumberField, ReferenceField, DateField, EditButton } from 'react-admin';
import { Edit, SimpleForm, TextInput, NumberInput, ReferenceInput, DateInput, SelectInput } from 'react-admin'
import Schedule from '../component/Schedule'
import Paper from '@material-ui/core/Paper';

export const BookingList = props => (
    <Paper {...props}>

        <Schedule
            defaultView='Month' />

    </Paper>

);

export const BookingEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <NumberInput source="availableTimeID" />
            <DateInput source="createdAt" />
            <DateInput source="updatedAt" />
        </SimpleForm>
    </Edit>
);