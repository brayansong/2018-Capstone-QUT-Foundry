import React from 'react';
import { List, Datagrid, TextField, NumberField, ReferenceField, DateField, EditButton, CreateButton, DeleteButton } from 'react-admin';
import { Edit, Create, SimpleForm, TextInput, NumberInput, ReferenceInput, DateInput, SelectInput } from 'react-admin'
import Schedule from '../component/Schedule'
/* import { TimeField } from './customRa' */
import Select from 'react-select';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import BookingRoom from "../component/BookingRoom"
const jwtDecode = require("jwt-decode");


const TimeFromToField = ({ record = {}, source }) =>
    <div>
        {/*         {Date(record[source].startDate)} */}
        {new Date(record[source].startDate).getHours()}:{new Date(record[source].startDate).getMinutes()} - {new Date(record[source].endDate).getHours()}{new Date(record[source].startDate).getMinutes()}

    </div>;

const BookFullName = ({ record = {}, source }) =>
    <div>
        {record["UserInfo"]["firstName"] + " " + record["UserInfo"]["lastName"]}
    </div>;
const RoomField = ({ record = {}, source }) => {

    if (record[source] === null) {
        return (

            <BookingRoom
                mentorBookingId={record.id}
                location={record.location} />
        )
    }
    else if (record[source] === "!booking") {
        return (<div style={{ color: "#8b0000" }}>
            Booking request sent, wait for Admin response
            </div>
        )
    }
    else {
        return (
            <div>
                {record[source]}
            </div>
        )
    }


};

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const ProgramName = ({ record = {}, source }) =>
    <div>
        {record["MentorProgram"]["programName"]}
    </div>;

const BookingListActions = ({ basePath, data, resource }) => {

    if (jwtDecode(localStorage.getItem("token")).userType === "Entrepreneur")
        return (
            <CardActions style={cardActionStyle}>
                <CreateButton basePath={basePath} record={data} />
            </CardActions>
        )
    else {
        return (<div></div>)
    }
};

export const BookingList = props => (
    <div>
        <List {...props} style={{ marginBottom: 16 }} actions={<BookingListActions />} >


            <Datagrid >
                <TextField source="id" />
                <TimeFromToField label="Booking time" source="AvailableTime" />

                <BookFullName label="Student Name" />
                <ProgramName label="Program " />
                <RoomField source="location" />
                {/* <EditButton /> */}
                <DeleteButton />
            </Datagrid>
        </List>
        <Paper >
            <Schedule
                defaultView='Month' />
        </Paper>


    </div>


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

