import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import SERVER_DOMAIN from "../constants/server";
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

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
            location: null,
            done: false,
        };

    }

    componentDidMount() {


    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    bookRoom = () => {
        let credentials = {
            location: this.state.location
        }
        axios.put(SERVER_DOMAIN + "/api/bookings/" + this.props.bookingId, credentials, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(response => {

                console.log(response)
                this.setState({
                    done: true
                }, () => {
                    axios.delete(SERVER_DOMAIN + "/api/roomRequest/" + this.props.roomRequestId, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
                        .then(response => {
                            console.log("delete correctly")
                        })
                        .catch(err => {
                            alert(err)
                        });
                })
            })
            .catch(err => {
                alert(err)
            });
    }
    submit = (e) => {

        /*       this.setState({
                  location: e
              }) */
        console.log(this.state.location)
        this.bookRoom()
        this.handleClose()
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <form onSubmit={this.submit}>
                    {this.state.done === true ? (<div style={{ color: "#4cae4c" }}>Room Assigned to {this.state.location}, refresh to dismiss</div>) : (
                        <Button variant="contained" size="small" color="primary" onClick={this.handleClickOpen}>
                            Assign a room
                        </Button>
                    )}

                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Assign a Room"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Please provide an available location for user to book a place for buisness meeting purpose
                        </DialogContentText>

                            <TextField
                                id="standard-full-width"
                                label="Location"
                                style={{ margin: 8 }}
                                placeholder="Room, location, any place is fine"
                                value={this.state.location}
                                onChange={(e) => {
                                    this.setState({
                                        location: e.target.value
                                    })
                                }}
                                fullWidth
                                margin="normal"
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.submit} color="primary">
                                submit
                            </Button>
                            <Button onClick={this.handleClose} style={{ color: "red" }} autoFocus>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>


                </form>
            </MuiThemeProvider>
        );
    }


}

BookingRoom.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookingRoom);