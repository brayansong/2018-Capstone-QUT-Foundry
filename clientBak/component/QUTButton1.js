import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowForward from "@material-ui/icons/ChevronRight";

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
    paddingLeft: theme.spacing.unit * 8,
    paddingRight: theme.spacing.unit * 8,
    paddingTop: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 6
  },
  icon: {
    border: "1px solid",
    marginRight: theme.spacing.unit * 2
  }
});

class QUTButton1 extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, children } = this.props;
    const { value } = this.state;

    return (
      <Button className={classes.button}>
        <ArrowForward className={classes.icon} />
        {children}
      </Button>
    );
  }
}

QUTButton1.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QUTButton1);
