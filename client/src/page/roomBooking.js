import React from 'react';
import { List, Datagrid, TextField, NumberField, ReferenceField, DateField, EditButton, DeleteButton } from 'react-admin';
import { Edit, Create, SimpleForm, TextInput, NumberInput, ReferenceInput, DateInput, SelectInput } from 'react-admin'
import Schedule from '../component/Schedule'
/* import { TimeField } from './customRa' */
import Select from 'react-select';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import BookingRoom from "../component/BookingRoom"

import AssignRoomButton from "../component/AssignRoomButton"
const TimeFromToField = ({ record = {}, source }) => {

    if (record["Booking"] !== undefined)
        return (<div>
            {/*         {Date(record[source].startDate)} */}
            {new Date(record["Booking"][source].startDate).getHours()}:{new Date(record["Booking"][source].startDate).getMinutes()} - {new Date(record["Booking"][source].endDate).getHours()}{new Date(record["Booking"][source].startDate).getMinutes()}

        </div>)

    return (
        <div>

        </div>
    )
}



const BookFullName = ({ record = {}, source }) =>
    <div>
        {record["UserInfo"]["firstName"] + " " + record["UserInfo"]["lastName"]}
    </div>;



const AssignRoom = ({ record = {}, source }) =>
    <AssignRoomButton
        roomRequestId={record["id"]}
        bookingId={record["Booking"]["id"]}

    />;

export const RoomrequestList = props => (
    <List {...props}>
        <Datagrid >
            <NumberField label="Request Id" source="id" />
            <NumberField label="Mentor" source="Booking.MentorProgram.UserInfo.firstName" />
            <NumberField label="Program" source="Booking.MentorProgram.programName" />
            <TimeFromToField source="AvailableTime" />
            <AssignRoom />
            <DeleteButton />
        </Datagrid>
    </List>
);