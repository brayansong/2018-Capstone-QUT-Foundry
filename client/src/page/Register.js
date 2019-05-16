import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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

class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'login',
      snack: false,
      username: '',
      password1: '',
      password2: '',
      email: '',
      type: '',
      firstName: null,
      lastName: null,
      dob: Date.now(),
      gender: null,
      qutId: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }


  componentDidMount() {
    const query = jwtDecode(queryString.parse(this.props.location.search).token);
    this.setState({
      email: query.email,
      type: query.role,
    }, () => {
      console.log(this.state)
    })
  }
  handleSnackClose = () => {
    this.setState({ snack: false });
  };

  handleChange = event => {
    // console.log( event.target.value)
    // this.setState({ [event.target.name]: event.target.value });
    let name = event.target.name;
    let value = event.target.value;
    console.log(name, value);

    let data = {};
    data[name] = value;
    this.setState(data);
  };

  submit(e) {
    e.preventDefault();
    if (this.state.password1 != this.state.password2) {
      this.setState({ snack: true, message: 'password should be the same' });
    }
    else {
      const credentials = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        dob: e.target.dob.value,
        gender: e.target.gender.value,
        email: e.target.email.value,
        username: e.target.email.value,
        password: e.target.password1.value,
        type: e.target.type.value,
        qutId: e.target.qutId.value,


      };


      axios.post(SERVER_DOMAIN + "/api/register" + this.props.location.search, credentials)
        .then(success => {
          console.log(success.response)
          this.setState({ snack: true, message: 'User Created successful' });
          this.goHome()
        })
        .catch(err => {
          console.log(err.response)
          console.log(err)
          this.setState({ snack: true, message: err.response.data.message });

        })
        ;
    }
  }
  goHome = () => {
    this.props.history.push("")
  }


  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>

            <Typography component="h1" variant="h5">
              QUT Foundry Register
        </Typography>
            <form className={classes.form} onSubmit={this.submit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" name="email" type="email" autoComplete="email" value={this.state.email} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input name="password1" type="password" id="password1" value={this.state.password1} autoComplete="current-password" onChange={this.handleChange} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="confirm password">Confirm Password</InputLabel>
                <Input name="password2" type="password" id="password2" value={this.state.password2} autoComplete="confirm-password" onChange={this.handleChange} />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">FirstName </InputLabel>
                <Input name="firstName" type="text" id="firstName" value={this.state.firstName} autoComplete="firstName" onChange={this.handleChange} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="confirm password">LastName</InputLabel>
                <Input name="lastName" type="lastName" id="lastName" value={this.state.lastName} autoComplete="lastName" onChange={this.handleChange} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Date of Birth</InputLabel>
                <Input name="dob" type="date" id="dob" value={this.state.dob} autoComplete="date" onChange={this.handleChange} />
              </FormControl>

              <FormControl margin="normal" className={classes.formControl} required fullWidth>
                <InputLabel htmlFor="type-native-simple">type</InputLabel>
                <Select
                  native
                  value={this.state.type}
                  fullWidth
                  /*                   onChange={(e) => this.setState({
                                      type: e.target.value
                                    })} */
                  inputProps={{
                    name: 'type',
                    id: 'type-native-simple',
                  }}
                >
                  <option value="" />
                  <option value={'Admin'}>Admin</option>
                  <option value={'Mentor'}>Mentor</option>
                  <option value={'Entrepreneur'}>Entrepreneur</option>
                </Select>
              </FormControl>
              <FormControl margin="normal" className={classes.formControl} required fullWidth>
                <InputLabel htmlFor="type-native-simple">Gender</InputLabel>
                <Select
                  native
                  value={this.state.gender}
                  fullWidth
                  onChange={(e) => this.setState({
                    gender: e.target.value
                  })}
                  inputProps={{
                    name: 'gender',
                    id: 'gender-native-simple',
                  }}
                >
                  <option value="" />
                  <option value={'male'}>male</option>
                  <option value={'female'}>female</option>
                </Select>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">QUT Id</InputLabel>
                <Input name="qutId" type="number" id="qutId" value={this.state.qutId} onChange={this.handleChange} />
              </FormControl>



              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
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
      </MuiThemeProvider>
    );
  }


}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterForm);