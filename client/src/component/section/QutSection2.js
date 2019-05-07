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
import QUTCard1 from "../QUTCard1";

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
    //padding: 10
  },
  icon: {
    border: "1px solid"
  },
  media: {
    background: "black",
    height: 270,
    width: "100%"
  },
  button: {
    color: theme.palette.primary.lightest,
    borderColor: theme.palette.primary.lightest,
    "&:hover": {
      color: theme.palette.primary.light,
      borderColor: theme.palette.primary.light,
    },
    minWidth: "fit-content"
  }
});

class QutSection2 extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, children, content, title, background } = this.props;
    const { value } = this.state;

    return (
      <Frame background={background}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>

        <Grid container className={classes.root} spacing={0}>
          <Grid item xs={4}>
            <QUTCard1
              date="10/2/2018"
              title="Transdisiplinary"
              contant="We tackle some of the biggest questions facing the planet by combining different disciplines and capabilities. Our transdisciplinary research approach is delivering unique solutions."
              image="/images/Old-Government-House-1.jpg"
            />
          </Grid>
          <Grid item xs={4}>
            <QUTCard1
              date="10/4/2018"
              title="Transdisiplinary"
              contant="We tackle some of the biggest questions facing the planet by combining different disciplines and capabilities. Our transdisciplinary research approach is delivering unique solutions."
              image="/images/Old-Government-House-1.jpg"
            />
          </Grid>
          <Grid item xs={4}>
            <QUTCard1
              date="10/6/2018"
              title="Transdisiplinary"
              contant="We tackle some of the biggest questions facing the planet by combining different disciplines and capabilities. Our transdisciplinary research approach is delivering unique solutions."
              image="/images/Old-Government-House-1.jpg"
            />
          </Grid>
        </Grid>
        <div className="w100 m-auto t-center mt-5">
          <Button variant="outlined" size="large" color="primary" className={classes.button}>+ Show More</Button>
        </div>

      </Frame>
    );
  }
}

QutSection2.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QutSection2);
