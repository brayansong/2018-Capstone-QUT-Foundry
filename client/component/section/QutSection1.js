import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Frame from "./Frame";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";

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
    padding: 10
  },
  icon: {
    border: "1px solid"
  },
  media: {
    background: "black",
    height: 270,
    width: "100%"
  }
});

class QutSection1 extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, children, content, title, buttonText, theme } = this.props;
    const { value } = this.state;

    return (
      <Frame>
        <Grid container className={classes.root} spacing={32}>
          <Grid item xs={6}>
            <CardMedia
              className={classes.media}
              image="../../../Docs/Data/img/science-engineering-centre"
              title="Paella dish"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>

            <Typography variant="body1" gutterBottom>
              {content}
            </Typography>
          </Grid>
        </Grid>
      </Frame>
    );
  }
}

QutSection1.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QutSection1);
