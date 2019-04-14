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
import AuthProvider from "../authProvider.js";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
/* import Link from 'umi/link'; */
import { Redirect, Link } from 'react-router-dom'

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            // marginRight: 'auto',
        },
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

class MyLoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: 'login',
            snack: false,
            loggedIn: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(event) {
        //console.log(event.target.value);
        let name = event.target.name;
        let value = event.target.value;
        console.log(name, value);

        let data = {};
        data[name] = value;
        this.setState(data);
    }

    handleSnackClose = () => {
        this.setState({ snack: false });
    };

    submit = (e) => {
        e.preventDefault();
        // gather your data/credentials here
        const credentials = {
            username: this.state.email,
            password: this.state.password
        };

        console.log("userLogin")
        console.log(userLogin)
        console.log("userLogin")
        // Dispatch the userLogin action (injected by connect)
        AuthProvider("AUTH_LOGIN", credentials)
            .then(result => {
                console.log("success")
                console.log(result)
                this.goHome()
            })
            .catch(err => {
                console.log("err")
                console.log(err.message)
                this.setState({ snack: true, message: err.message });
            })

    }
    goHome = () => {
        this.props.history.push("")

    }
    render() {
        const { classes } = this.props;

        if (this.state.loggedIn) {
            // return <Redirect to='/' />
        }
        return (
            <MuiThemeProvider theme={this.props.theme}>
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>

                        <Typography component="h1" variant="h5">
                            QUT Foundry Login
        </Typography>
                        <form className={classes.form} onSubmit={this.submit}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Username</InputLabel>
                                <Input id="email" name="email" value={this.state.email} autoComplete="email" autoFocus onChange={this.handleChange} />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input name="password" type="password" id="password" value={this.state.password} autoComplete="current-password" onChange={this.handleChange} />
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Typography variant="caption" gutterBottom>
                                <Link to="#">Forgot your password?</Link>
                            </Typography>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Login
          </Button>
                            <Link to="/register-email">
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Register
          </Button></Link>

                        </form>
                    </Paper>

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
};

export default connect(undefined, { userLogin })(withStyles(styles)(MyLoginPage));