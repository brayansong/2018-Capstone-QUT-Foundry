import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from 'umi/link';

import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Add";

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
};

function LoginCard(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Menu"
                    >
                        {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Qut logo
          </Typography>
                    <Link to="/login">
                        <Button color="inherit">Login</Button>
                    </Link>

                    <Button color="inherit">Contact QUT</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

LoginCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginCard);
