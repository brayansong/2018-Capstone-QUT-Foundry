import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../component/theme";
import SERVER_DOMAIN from "../constants/server";
import axios from 'axios';
import QUTCard2 from '../component/QUTCard2';
const queryString = require('query-string');
const jwtDecode = require("jwt-decode");

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
            userInfo: jwtDecode(localStorage.getItem("token")),
            data: "wrhiaewrfauiwef",
            expertise: [],
            faculty: [],
            personalInfo: [],

        };

    }

    getfaculty = () => {
        return axios({
            method: "get",
            url: SERVER_DOMAIN + "/api/faculties?_end=10&_order=DESC&_sort=id&_start=0",
            headers: {
                "Content-Type": "text/plain",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(data => {

                console.log(data)
                this.setState({
                    faculty: data.data
                }, () => {
                    console.log(this.state.faculty)
                })
            })
            .catch(error => {
                alert(error);
            });
    }

    getexpertise = () => {
        return axios({
            method: "get",
            url: SERVER_DOMAIN + "/api/expertises?_end=10&_order=DESC&_sort=id&_start=0",
            headers: {
                "Content-Type": "text/plain",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(data => {

                console.log(data)
                this.setState({
                    expertise: data.data
                }, () => {
                    console.log(this.state.faculty)
                })
            })
            .catch(error => {
                alert(error);
            });
    }

    getpersonalInfo = () => {
        return axios({
            method: "get",
            url: SERVER_DOMAIN + "/api/faculties?_end=10&_order=DESC&_sort=id&_start=0",
            headers: {
                "Content-Type": "text/plain",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(data => {

                console.log(data)
                this.setState({
                    personalInfo: data.data
                }, () => {
                    console.log(this.state.faculty)
                })
            })
            .catch(error => {
                alert(error);
            });
    }
    componentDidMount() {

        axios.all([this.getfaculty(), this.getexpertise(), this.getpersonalInfo()]).then(response => {
            this.setState(
                {
                    isLoading: false
                },
                function () { }
            );
        });
    }


    render() {
        const { classes } = this.props;
        const { userInfo, data, personalInfo, faculty, expertise } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <main className={classes.main}>

                    <div >
                        <Typography variant="h6" gutterBottom>
                            {userInfo.firstName + ", " + userInfo.lastName + " (" + userInfo.qutId + ")"}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Your information is managed by CAPSTONE TEAM JEEB.
                        </Typography>
                    </div>
                    <div className={classes.background}>
                        <Grid container className={classes.root} spacing={32}>

                            <Grid item xs={6}>
                                <QUTCard2
                                    title="expertises"
                                    ViewAll

                                    Add
                                    data={expertise}
                                    attribute="title"
                                />
                                {/*   <QUTCard2
                                    title="Archievement"

                                    Edit
                                    ViewAll
                                    data={data}
                                /> */}
                                {/*   <QUTCard2
                                    title="Working Time"
                                    Edit
                                    data={data}
                                /> */}
                                <QUTCard2
                                    title="faculties"
                                    ViewAll
                                    Add
                                    data={faculty}
                                    attribute="faculty"

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <QUTCard2
                                    title="Personal Information"
                                    Edit
                                    data={personalInfo}
                                    onlyObject=""
                                />
                            </Grid>

                        </Grid>
                    </div>

                </main>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snack}
                    onClose={this.handleSnackClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                />
            </MuiThemeProvider>
        );
    }


}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);