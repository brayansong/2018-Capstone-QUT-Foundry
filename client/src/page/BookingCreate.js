import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../component/theme";
import { Redirect } from 'react-router-dom'
import SERVER_DOMAIN from "../constants/server";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Select from 'react-select';

import { Edit, Create, SimpleForm, TextInput, NumberInput, ReferenceInput, DateInput, SelectInput } from 'react-admin'
const queryString = require('query-string');
const jwtDecode = require("jwt-decode");

function formatDate(e) {
    var date = new Date(e)
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    return day + ' ' + monthNames[monthIndex] + ' ' + hours + ":" + minutes;
}
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        /*         [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
                    width: 400,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }, */
    },
    paper: {
        marginTop: theme.spacing.unit * 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    background: {
        background: "white",
        height: "100%"
    }
});

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: "",
            userInfo: jwtDecode(localStorage.getItem("token")),
            data: "wrhiaewrfauiwef",
            mentorProgramList: [],
            timeSlotList: [],
            mentorList: [],
            mentorProgramIndex: [],
            mentorPrograms: null,
            timeSlot: null,
            mentor: null,

        };

    }

    formatDateLabel = (e, f) => {


        return "from: " + formatDate(e) + " to:" + formatDate(f)
    }
    getTimeSlot = (e) => {
        console.log(e)
        return axios({
            method: "get",
            url: SERVER_DOMAIN + "/api/availableTimes?_end=10&_order=DESC&_sort=id&_start=0&include=" + e.mentorId,
            headers: {
                "Content-Type": "text/plain",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(data => {


                console.log(data)
                this.setState({
                    timeSlotList: data.data.map(item => {
                        return { value: item.id, label: this.formatDateLabel(item.startDate, item.endDate), startDate: item.startDate, endDate: item.endDate, mentorId: item.userId, }
                    })
                }, () => {
                    console.log("GGG")
                    console.log(this.state.mentorProgramList)
                })
            })
            .catch(error => {
                alert(error);
            });
    }

    getmentorPrograms = () => {
        return axios({
            method: "get",
            url: SERVER_DOMAIN + "/api/mentorPrograms?_end=10&_order=DESC&_sort=id&_start=0&q=",
            headers: {
                "Content-Type": "text/plain",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(data => {

                console.log(data)

                let mentorProgramList = data.data.map(item => {
                    return { value: item.id, label: item.programName, mentorId: item.mentorId, mentorName: item.UserInfo.firstName + " " + item.UserInfo.lastName }
                })
                let mentorProgramIndex = data.data.map((item, idx) => {
                    return { value: idx, label: item.programName }
                })
                let finalMentorProgramIndex = []
                mentorProgramIndex = mentorProgramIndex.map(item => {
                    if (!finalMentorProgramIndex.map(item => item.label).includes(item.label))
                        finalMentorProgramIndex = [...finalMentorProgramIndex, item]

                })
                this.setState({
                    mentorProgramIndex: finalMentorProgramIndex
                }, () => {
                    console.log("GGG")
                    console.log(this.state.mentorProgramList)
                })
            })
            .catch(error => {
                alert(error);
            });
    }
    getMentor = (e) => {
        return axios({
            method: "get",
            url: SERVER_DOMAIN + "/api/mentorPrograms?_end=10&_order=DESC&_sort=id&_start=0&q=" + e.label,
            headers: {
                "Content-Type": "text/plain",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(data => {

                console.log(data)
                this.setState({
                    mentorProgramList: data.data.map(item => {
                        return { value: item.id, programName: item.programName, mentorId: item.mentorId, label: item.UserInfo.firstName + " " + item.UserInfo.lastName }
                    })
                }, () => {
                    console.log("GGG")
                    console.log(this.state.mentorProgramList)
                })
            })
            .catch(error => {
                alert(error);
            });
    }
    componentDidMount() {

        axios.all([this.getmentorPrograms()]).then(response => {
            this.setState(
                {
                    isLoading: false
                },
                function () { }
            );
        });
    }
    selectedItem = name => (e) => {
        this.setState({
            [name]: e
        })
        if (name === "mentorPrograms") {
            this.getMentor(e)
        }
        if (name === "mentor") {
            this.getTimeSlot(e)
        }
        if (name === "timeSlot") {

        }
    }
    submit = (e) => {
        e.preventDefault()
        console.log(this.state.timeSlot)
        console.log(this.state.mentor)
        const credentials = {
            availableTimeID: this.state.timeSlot.value,
            mentorProgramId: this.state.mentor.value,
        };


        axios.post(SERVER_DOMAIN + "/api/bookings", credentials, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(success => {
                this.setState({
                    redirect: "/bookings"
                })
            })
            .catch(err => {
                alert("err.response.data.message")
                //this.setState({ snack: true, message: err.response.data.message });
            })
            ;
    }

    render() {
        const { classes } = this.props;
        const { mentorProgramList, timeSlotList, redirect, mentorPrograms, mentorProgramIndex, mentor, timeSlot } = this.state;

        if (redirect !== "") {
            return (<Redirect to={this.state.redirect} />)
        }
        return (
            <MuiThemeProvider theme={theme}>
                <Paper {...this.props}>
                    <form onSubmit={this.submit}>

                        <Select options={mentorProgramIndex}
                            value={mentorPrograms}
                            placeholder="Select mentor program"
                            onChange={this.selectedItem("mentorPrograms")}
                        />
                        {mentorPrograms !== null ? (
                            <Select options={mentorProgramList}
                                placeholder="Please select a mentor"
                                value={mentor}
                                onChange={this.selectedItem("mentor")}
                            />
                        ) : null}
                        {mentor !== null ? (
                            <Select options={timeSlotList}
                                placeholder="Please select a timeslot"
                                value={timeSlot}
                                onChange={this.selectedItem("timeSlot")}
                            />
                        ) : null}


                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            disabled={timeSlot !== null ? false : true}
                        >Submit</Button>
                    </form>
                </Paper>
            </MuiThemeProvider>
        );
    }


}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);