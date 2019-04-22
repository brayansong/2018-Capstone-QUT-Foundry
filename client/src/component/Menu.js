import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
    fontSize: 15.3,
    minWidth: 72,
    color: "white",
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      color: theme.palette.secondary.main,
      background: "white",
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&$tabSelected': {
      color: theme.palette.secondary.main,
      background: "white",
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: theme.palette.secondary.main,
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
});

class Menu extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <div>
          <AppBar position="static">
            <Tabs className="container" value={value} onChange={this.handleChange}>
              <Tab className=" menutab" label="Foundry" classes={{ root: classes.tabRoot, selected: classes.tabSelected }} />
              <Tab className=" menutab" label="Hot Pops" classes={{ root: classes.tabRoot, selected: classes.tabSelected }} />
              <Tab className=" menutab" label="About Us" classes={{ root: classes.tabRoot, selected: classes.tabSelected }} />
            </Tabs>
          </AppBar>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);
