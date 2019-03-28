import React, { Component } from 'react';
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
import { Select , MenuItem} from '@material-ui/core';
import { cpus } from 'os';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
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

class RegisterForm extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password1:'',
      password2:'',
      email:'',
      type:'',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  

  componentDidMount() {
    this.setState({
    
    });
  }

  handleChange = event => {
    // console.log( event.target.value)
    // this.setState({ [event.target.name]: event.target.value });
    let name = event.target.name;
    let value = event.target.value;
    console.log(name,value);

    let data = {};
    data[name]= value;
    this.setState(data);
  };

render(){
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
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" name="username" value={this.state.username} autoComplete="username" autoFocus onChange={this.handleChange}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password1" type="password1" id="password1" value={this.state.password1} autoComplete="current-password" onChange={this.handleChange}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="confirm password">Confirm Password</InputLabel>
            <Input name="password2" type="password2" id="password2" value={this.state.password2} autoComplete="confirm-password" onChange={this.handleChange}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" name="email" autoComplete="email" value={this.state.email} onChange={this.handleChange}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="type">Type</InputLabel>
            <Select
              value={this.state.type}
              onChange={this.handleChange}
              input={<Input name="type" id="type-selection" readOnly/>}
            >
          <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="mentor">Mentor</MenuItem>
            <MenuItem value="member">Member</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            </Select>
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
    </MuiThemeProvider>
  );
}

submit(e){
  e.preventDefault();
  window.axios.post('http://qutfoundry.jeffreylaudex.tk:3000',
  {username:this.state.username,
    password1:this.state.password1,
    password2:this.state.password2,
    email:this.state.email,
    type:this.state.type})
  .then(response=>{
    console.log('response');

    localStorage.setItem('token',response.data.auth.access_token)
  })
  ;
}
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterForm);