import React from 'react';
import { List, Datagrid, ShowButton, TextField, ArrayInput, BooleanInput, SimpleFormIterator, EmailField, BooleanField, NumberField, ReferenceField, DateField, EditButton } from 'react-admin';
import { Edit, Show, SimpleShowLayout, ArrayField, Create, SimpleForm, TextInput, NumberInput, ReferenceInput, DateInput, SelectInput } from 'react-admin'
import Schedule from '../component/Schedule'
import Select from 'react-select';
import Paper from '@material-ui/core/Paper';


export const FullName2 = ({ record = {}, source }) =>{
   
    if(record["UserInfo"] !== undefined)
    if(record["UserInfo"]["firstName"] !== undefined)
    return(
        <div>
        {record["UserInfo"]["firstName"]+" "+ record["UserInfo"]["lastName"]}
      </div>
    )
    return(
        <div>
        </div>
    )
}
    
export const UserType = ({ record = {}, source }) =>{
    if(record[source.split(".")[0]] !== undefined)
    if(record[source.split(".")[0]][source.split(".")[1]] !== undefined)
    return(
        <div>
            {record[source.split(".")[0]][source.split(".")[1]] === 0 ? "Admin" : record[source.split(".")[0]][source.split(".")[1]] === 1 ? "Mentor" : record[source.split(".")[0]][source.split(".")[1]] === 2 ? "Entrepreneur" : null}
        </div>
    )
    return(
        <div>
        </div>
    )
};
    

export const UserList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <EmailField source="email" />
            <BooleanField source="active" />
            <FullName2 source="name" />
            <DateField label="dob" source="UserInfo.dob" />
            <TextField label="gender" source="UserInfo.gender" />
            <UserType label="User Type" source="UserInfo.userType" />
            <TextField label="QUT Id" source="UserInfo.qutId" />
            <DateField label="Create At" source="UserInfo.createdAt" />
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

/* const userDetial = ({ record = {}, source }) =>
    <div>
    </div>
 */
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