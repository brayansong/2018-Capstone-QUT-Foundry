import React from 'react';
import { List, Datagrid, TextField, NumberField, ReferenceField, DateField, EditButton } from 'react-admin';
import { Edit, Create, LongTextInput, Show, SimpleShowLayout, SimpleForm, TextInput, NumberInput, ReferenceInput, DateInput, SelectInput } from 'react-admin'
import Schedule from '../component/Schedule'
import Select from 'react-select';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import TagInput from "./TagInput"
import { FullName } from './customRa'


const Description = ({ record = {}, source }) =>
    <Typography variant="body1" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: 400 }}>
        {record[source]}
    </Typography>;

export const MentorprogramList = props => (
    <List {...props}>
        <Datagrid >

            <TextField source="programName" />
            <FullName source="UserInfo" label="Mentor Name" />
            <TextField source="category" />
            <Description source="description" />

            <EditButton />
        </Datagrid>
    </List>
);

export const MentorprogramCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="programName" />
            <LongTextInput source="description" />
            <TextInput source="category" />

        </SimpleForm>
    </Create>
);

export const MentorprogramEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="programName" />
            <LongTextInput source="description" />
            <TextInput source="category" />
        </SimpleForm>
    </Edit>
);




export const MentorprogramShow = props => (
    <Show {...props}>
        <SimpleShowLayout>

            <TextField source="programName" />
            <FullName source="UserInfo" label="Mentor Name" />
            <TextField source="description" />
            <TextField source="category" />
            <DateField source="createdAt" />
        </SimpleShowLayout>
    </Show>
);