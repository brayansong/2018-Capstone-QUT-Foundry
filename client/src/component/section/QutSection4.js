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
    height: 300,
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
    const { classes, children, content, title, buttonText, theme, image } = this.props;
    const { value } = this.state;

    return (
      <Frame >
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>

        <Grid container className={classes.root} spacing={32}>
          <Grid item xs={6}>
            <CardMedia
              className={classes.media}
              image={image}
              title="Paella dish"
            />
          </Grid>
          <Grid item xs={6} className="flex-justify-center">
            <Typography variant="h5" gutterBottom>
              Our Location
            </Typography>
            <Typography variant="body1" gutterBottom>
              Address: Room 204, Block D, Gardens Point, Brisbane QLD 4059<br />
              Phone: +61 7 3138 9420<br />
              Fax: +61 7 3138 9421
            </Typography>
            {/*   <Typography variant="h5" gutterBottom>
              Our Location
            </Typography>
            <Typography variant="body1" gutterBottom>
              wefwef
            </Typography> */}


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
