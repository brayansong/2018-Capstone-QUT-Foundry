import React, { Component } from 'react';
import { connect } from 'react-redux';
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
/* import LockOutlinedIcon from '@material-ui/icons/LockOutlined'; */
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Select, MenuItem } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider } from "@material-ui/core/styles";
import SERVER_DOMAIN from "../constants/server";
import axios from 'axios';

import theme from '../component/theme'

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
class RegisterEmail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      name: null,
      role: null,
      message: 'login',
      snack: false,
    };

    this.onSubmit = this.onSubmit.bind(this);

  }
  handleSnackClose = () => {
    this.setState({ snack: false });
  };

  onSubmit(e) {
    e.preventDefault();
    const credentials = {
      email: e.target.email.value,
      name: e.target.name.value,
      role: e.target.type.value
    };


    axios.post(SERVER_DOMAIN + "/api/register/invitation", credentials)
      .then(success => {
        console.log(success.response)
        this.setState({ snack: true, message: 'email sent' });
      })
      .catch(err => {
        this.setState({ snack: true, message: err.response.data.message });
      })
      ;
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>

            <Typography component="h1" variant="h5">
              QUT Login Identify
          </Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input id="name" name="name" autoComplete="name" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Email</InputLabel>
                <Input name="email" type="email" id="email" />
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Send Invitation
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

RegisterEmail.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default connect(undefined, {})(withStyles(styles)(RegisterEmail));