import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../component/theme";
import { Select, MenuItem } from '@material-ui/core';
import SERVER_DOMAIN from "../constants/server";
import axios from 'axios';
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
});

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: jwtDecode(localStorage.getItem("token"))
        };

    }


    render() {
        const { classes } = this.props;
        const { userInfo } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <main className={classes.main}>
                    <Card>
                        <CardHeader title={"Hi " + userInfo.firstName + ", " + userInfo.lastName} />

                        <CardContent>
                            Welcome to qut foundry<br />
                            The Json below is your user data
                            <pre>{JSON.stringify(userInfo, null, 2)}</pre>
                        </CardContent>
                    </Card>


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