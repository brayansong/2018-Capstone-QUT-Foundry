
import React from 'react';
export const FullName = ({ record = {}, source }) =>
    <div>
        {record[source].firstName + " " + record[source].lastName}
    </div>;

export const FullName2 = ({ record = {}, source }) =>
    <div>
        {record["firstName"] + " " + record["lastName"]}
    </div>;

export const UserType = ({ record = {}, source }) =>
    <div>
        {record[source] === 0 ? "Admin" : record[source] === 1 ? "Mentor" : record[source] === 2 ? "Entrepreneur" : null}
    </div>;





