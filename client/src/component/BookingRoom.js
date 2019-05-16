import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import SERVER_DOMAIN from "../constants/server";
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Button from '@material-ui/core/Button';


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

class BookingRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            room: null
        };

    }

    componentDidMount() {

        axios.get(SERVER_DOMAIN + "/api/roomRequest?mentorBookingId=" + this.props.mentorBookingId, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(response => {
                console.log("response")
                console.log(response)
                if (response.data !== "") {
                    this.setState({
                        room: "Booking request sent, wait for Admin response"
                    })
                }


            })
            .catch(error => {
            })

    }
    // {{hostname}}/api/roomRequest/3

    bookRoom = () => {
        let credentials = {
            mentorBookingId: this.props.mentorBookingId
        }
        axios.post(SERVER_DOMAIN + "/api/roomRequest", credentials, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(response => {

                this.setState({
                    room: "Booking request sent, wait for Admin response"
                })
            })
            .catch(err => {
                alert(err)
            });
    }


    render() {
        const { classes, location } = this.props;
        if (location !== null) {
            return (
                <div>
                    {location}
                </div>
            )
        }
        if (this.state.room === "Booking request sent, wait for Admin response") {
            return (<div style={{ color: "#8b0000" }}>
                Booking request sent, wait for Admin response
            </div>
            )
        }
        return (
            <MuiThemeProvider theme={theme}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={() => this.bookRoom()}
                >
                    Book a room now!
                </Button>
            </MuiThemeProvider>
        );
    }


}

BookingRoom.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookingRoom);