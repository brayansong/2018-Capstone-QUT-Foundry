import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from 'react-admin';
import { MuiThemeProvider } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import AuthProvider from "../../authProvider.js";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
/* import Link from 'umi/link'; */
import { Redirect, Link } from 'react-router-dom'

const styles = theme => ({
    navBar: {
        backgroundColor: theme.palette.secondary.main,
        height: "76px",
        position: "absolute",
        width: "100%",
        left: 0,
        top: 0,
    }
})

class LoginHeader extends Component {


    render() {
        const { classes } = this.props;

        return (
            <MuiThemeProvider theme={this.props.theme}>
                <div className={classes.navBar}>
                    <div id="real-world"></div>
                    <a id="qut-logo" href="/#/home" title="Link to QUT home page">QUT home page</a>
                </div>
            </MuiThemeProvider>
        );
    }
};

export default connect(undefined, { userLogin })(withStyles(styles)(LoginHeader));