import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from 'react-admin';
import { MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Redirect, Link } from 'react-router-dom'
import LoginHeader from '../component/header/LoginHeader'

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'flex', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            // marginRight: 'auto',
        },
        height: '100%',
        alignItems: 'center',
    },
    paper: {
        //marginTop: theme.spacing.unit * 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 80,
        boxShadow: "0 5px 10px 3px rgba(0, 0, 0, 0.3)",
        padding: `${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2.5}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: `${theme.spacing.unit * 0.5}px `,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    loginBackground: {
        background: '#fff url("/images/qutlogin-bg-min.jpg") no-repeat top center; ',
        backgroundSize: "cover",
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        zIndex: -1,
    },
    icon: {
        //backgroundColor: theme.palette.secondary.main,
        color: "#003C71",

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

    handleSnackClose = () => { //It is calling an alert for this 
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
                    <LoginHeader />
                    <CssBaseline />
                    <Paper className={classes.paper}>

                        <Typography component="h1" variant="h5" id="Login-header">
                            LOGIN TO <strong>QUT FOUNDRY</strong>
                        </Typography>
                        <form className={classes.form} onSubmit={this.submit}>

                            <TextField
                                fullWidth
                                required
                                margin="normal"
                                variant="outlined"
                                id="email" name="email"
                                value={this.state.email}
                                autoComplete="email"
                                autoFocus
                                placeholder="Username"
                                onChange={this.handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle className={classes.icon} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                required
                                fullWidth
                                name="password"
                                type="password"
                                id="password"
                                value={this.state.password}
                                autoComplete="current-password"
                                onChange={this.handleChange}
                                //margin="normal"
                                placeholder="Password"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle className={classes.icon} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <div className="d-flex">
                                <Typography variant="caption" gutterBottom >
                                    <Link to="/register-email">Create a new Account?</Link>
                                </Typography>
                                <Typography variant="caption" gutterBottom className="ml-auto">
                                    <Link to="#">Forgot your password?</Link>
                                </Typography>
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Login
                            </Button>

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
                <div className={classes.loginBackground}></div>
            </MuiThemeProvider>
        );
    }
};

export default connect(undefined, { userLogin })(withStyles(styles)(MyLoginPage));