import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../component/theme";
import styles from "./styles"
import Link from 'umi/link';


class Confirmid extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: null,
      name: null,
      role: null
    };
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    }, () => {
      console.log(this.state)
    });
  };

  onSubmit = (e) => {
    e.preventDefault()

  }
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <main >
          <div className={classes.middle}>
            <Paper className={classes.paper}>

              <Typography component="h1" variant="h5">
                Send Invitation
              </Typography>
              <form className={classes.form} onSubmit={this.onSubmit}>
                <FormControl margin="normal" required fullWidth >
                  <InputLabel htmlFor="email">Qut Email</InputLabel>
                  <Input id="email" name="email" onChange={this.handleChange("email")} autoComplete="email" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input name="name" type="text" id="name" onChange={this.handleChange("name")} autoComplete="name" />
                </FormControl>
                <FormControl className={classes.formControl} required fullWidth>
                  <InputLabel htmlFor="role-simple">Role</InputLabel>
                  <Select
                    value={this.state.role}
                    onChange={this.handleChange("role")}
                    inputProps={{
                      name: 'role',
                      id: 'role-simple',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'admin'}>Admin</MenuItem>
                    <MenuItem value={'mentor'}>Mentor</MenuItem>
                    <MenuItem value={'entrepreneur'}>Entrepreneur</MenuItem>
                  </Select>
                </FormControl>


                <Link to="/login">
                  <Typography variant="caption" >
                    <Link to="#">Login</Link>
                  </Typography>
                </Link>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Send invitation Email
              </Button>


              </form>
            </Paper>

          </div>

        </main>
      </MuiThemeProvider>
    );
  }

}

Confirmid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Confirmid);