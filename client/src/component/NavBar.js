import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Link } from 'react-router-dom'
import MenuIcon from "@material-ui/icons/Menu";

const styles = theme => ({
  root: {
    flexGrow: 1,

  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    display: "none",
    [theme.breakpoints.down('sm')]: {
      display: "block"
    },
  },
  appbar: {
    backgroundColor: theme.palette.secondary.darkest
  }
});

function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root} >
      <AppBar position="static" className={classes.appbar} >
        <Toolbar className="d-flex container" style={{ height: 97.5 }}>
          <div>
            {/*  <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton> */}

            <a id="qutlogo" href="https://www.qut.edu.au" title="Link to QUT home page">QUT home page</a>

          </div>
          <div className="ml-auto">
            <Link to="./login"><Button color="inherit" style={{ color: "white" }} >Login</Button></Link>
            <Button color="inherit">Contact QUT</Button>
          </div>


        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
