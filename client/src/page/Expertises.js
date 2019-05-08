import React from 'react';
import { List, Datagrid, TextField, NumberField, ReferenceField, DateField, EditButton } from 'react-admin';
import { Edit, Create, SimpleForm, TextInput, NumberInput, ReferenceInput, DateInput, SelectInput } from 'react-admin'
import Schedule from '../component/Schedule'
import Paper from '@material-ui/core/Paper';


export const ExpertiseEdit = props => (
    <Edit {...props}>
        <SimpleForm>

            <TextInput source="title" />
        </SimpleForm>
    </Edit>
);

export const ExpertiseCreate = props => (
    <Create {...props}>
        <SimpleForm>

            <TextInput source="title" />
        </SimpleForm>
    </Create>
);