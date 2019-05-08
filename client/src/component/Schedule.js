import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import SERVER_DOMAIN from "../constants/server";
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    MonthView,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    Toolbar,
    ViewSwitcher,
    DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
const appointments = [
    {
        title: "Website Re-Design Plan",
        startDate: '2019-04-17 10:00',// new Date(2019, 4, 17, 9, 30),
        endDate: '2019-04-17 12:00',// new Date(2019, 4, 17, 11, 30),
        id: 0,
        location: "Room 1"
    },
];

const style = theme => ({
    todayCell: {
        backgroundColor: fade(theme.palette.primary.main, 0.1),
        '&:hover': {
            backgroundColor: fade(theme.palette.primary.main, 0.14),
        },
        '&:focus': {
            backgroundColor: fade(theme.palette.primary.main, 0.16),
        },
    },
    weekendCell: {
        backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
        '&:hover': {
            backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
        },
        '&:focus': {
            backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
        },
    },
    today: {
        backgroundColor: fade(theme.palette.primary.main, 0.16),
    },
    weekend: {
        backgroundColor: fade(theme.palette.action.disabledBackground, 0.06),
    },
});

const TimeTableCellBase = ({ classes, ...restProps }) => {
    const { startDate } = restProps;
    const date = new Date(startDate);
    if (date.getDate() === new Date().getDate()) {
        return <WeekView.TimeTableCell {...restProps} className={classes.todayCell} />;
    } if (date.getDay() === 0 || date.getDay() === 6) {
        return <WeekView.TimeTableCell {...restProps} className={classes.weekendCell} />;
    } return <WeekView.TimeTableCell {...restProps} />;
};

const TimeTableCell = withStyles(style, { name: 'TimeTableCell' })(TimeTableCellBase);

const DayScaleCellBase = ({ classes, ...restProps }) => {
    const { startDate, today } = restProps;
    if (today) {
        return <WeekView.DayScaleCell {...restProps} className={classes.today} />;
    } if (startDate.getDay() === 0 || startDate.getDay() === 6) {
        return <WeekView.DayScaleCell {...restProps} className={classes.weekend} />;
    } return <WeekView.DayScaleCell {...restProps} />;
};

const DayScaleCell = withStyles(style, { name: 'DayScaleCell' })(DayScaleCellBase);

export default class Demo extends React.PureComponent {

    constructor(props) {
        super(props);
        this.commitChanges = this.commitChanges.bind(this);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        axios.get(SERVER_DOMAIN + "/api/bookings?_end=1000&_order=DESC&_sort=id&_start=0", { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(response => {
                response.data = response.data.map(item => {

                    return {
                        title: item.MentorProgram.programName,
                        startDate: item.AvailableTime.startDate,
                        endDate: item.AvailableTime.endDate,
                        mentorId: item.UserInfo.id,
                        mentorName: item.UserInfo.firstName + " " + item.UserInfo.lastName,
                        bookingId: item.id
                    }
                })
                this.setState({
                    data: response.data
                }, () => {
                    this.setState({ isLoading: false })
                    console.log(this.state.data)
                })
            })
            ;

   
    }
    deleteAvailableTime = (credentials) => {
        let { data } = this.state;
        data = data.filter(appointment => appointment.id !== credentials);
        console.log(credentials)
        console.log(data)
      /*   axios.delete(SERVER_DOMAIN + "/api/bookings/" + credentials, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(response => {
                console.log("Add time success")
                console.log(response.data)
                this.setState({
                    data: data
                });
            })
            .catch(err => {
                alert(err)
            }); */
    }
    commitChanges({ added, changed, deleted }) {
        console.log("fuck ethan")
        console.log(added)
        console.log(changed)
        console.log(deleted)
        let { data } = this.state;
/*         if (added) {

            this.addAvailableTime(added)
        }
        if (changed) {
            this.changeAvailableTime(changed)
        } */
        if (deleted) {
            this.deleteAvailableTime(deleted)

        }
        this.setState({ data });
    }


    render() {
        const { data } = this.state;
        const { defaultView } = this.props
        console.log("new Date(2019, 4, 17, 9, 30)")

     
        return (
            <Scheduler
                height={600}
                data={data}
            >
                <ViewState
                    defaultCurrentViewName={defaultView}
                />
                <EditingState
                    onCommitChanges={this.commitChanges}
                />
                <DayView
                    startDayHour={9}
                    endDayHour={18}
                />
                <WeekView
                    startDayHour={9}
                    endDayHour={19}
                    timeTableCellComponent={TimeTableCell}
                    dayScaleCellComponent={DayScaleCell}
                />
                <MonthView
                />
                <Toolbar />
                <ViewSwitcher />
                <Appointments />
                <DateNavigator />
                <AppointmentTooltip
                    showOpenButton
                    showDeleteButton
                />
                <AppointmentForm />
            </Scheduler>
        );
    }
}