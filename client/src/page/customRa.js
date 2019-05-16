
import React from 'react';
export const FullName = ({ record = {}, source }) => {

    if (record[source] !== undefined)
        return (
            <div>
                {record[source].firstName + " " + record[source].lastName}
            </div>
        )
    return (
        <div>
            wef
            </div>
    )
}

export const FullName2 = ({ record = {}, source }) =>
    <div>
        {record["firstName"] + " " + record["lastName"]}
    </div>;

export const UserType = ({ record = {}, source }) =>
    <div>
        {record[source] === 0 ? "Admin" : record[source] === 1 ? "Mentor" : record[source] === 2 ? "Entrepreneur" : null}
    </div>;

export const TimeField = ({ record = {}, source }) =>
    <div>
        {new Date(record[source.split(".")[0]][source.split(".")[1]]).getHours()}
    </div>;





