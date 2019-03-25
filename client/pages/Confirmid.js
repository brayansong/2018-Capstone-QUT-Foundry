import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../component/theme";
import styles from "./styles"


function SignIn(props) {
  const { classes } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <main className={classes.middle}>
        <CssBaseline />
        <Paper className={classes.paper}>

          <Typography component="h1" variant="h5">
            QUT Login Identify
        </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Username</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Email</InputLabel>
              <Input name="Email" type="Email" id="Email" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="type">Type</InputLabel>
              <Input name="type" type="type" id="type" />
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
    </MuiThemeProvider>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);