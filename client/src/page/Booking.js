import React from 'react';
import { List, Datagrid, TextField, NumberField, ReferenceField, DateField, EditButton } from 'react-admin';
import { Edit, Create, SimpleForm, TextInput, NumberInput, ReferenceInput, DateInput, SelectInput } from 'react-admin'
import Schedule from '../component/Schedule'
import Select from 'react-select';
import Paper from '@material-ui/core/Paper';

export const BookingList = props => (
    <List {...props}>

        <Schedule
            defaultView='Month' />

    </List>

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


const program = [

    { value: 'chocolate', label: 'mentorship program' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const mentor = [

    { value: 'chocolate', label: 'jeffrey' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
const timeslot = [

    { value: 'chocolate', label: '5/7/2019 08:35' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
export const BookingCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <Select options={program} />
            <Select options={mentor} />
            <Select options={timeslot} />
            <NumberInput source="availableTimeID" />
        </SimpleForm>
    </Create>
);

