import React from "react";
import PropTypes from "prop-types";
import Slideshow from 'react-slidez';
import { withStyles } from "@material-ui/core/styles";
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css'; //Allows for server-side rendering.
import Grid from '@material-ui/core/Grid';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Radio from '@material-ui/core/Radio';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import QUTButton2 from '../QUTButton2'
const styles = theme => ({
  root: {
    padding: 10
  },
  paper: {
    height: 140,
    width: 100,
  },
  icon: {
    border: "1px solid"
  },
  media: {
    background: "black",
    height: 270,
    width: "100%"
  },
  slideItem: {
    backgroundColor: fade(theme.palette.primary.darkest, 0.85),
    //position: 'absolute',
    bottom: 0,
    padding: "2rem"
  },
  slidePosition: {
    position: "absolute",
    zIndex: 10000,
    bottom: 0,
    transform: "translate(0%, 50%)",
    width: "100%"
  },
  po: {
    position: "absolute",
    zIndex: 10000,
    bottom: 0,
    transform: "translate(0%, 50%)",
  }
});


class QutSlideItem extends React.Component {

  render() {
    const { classes, backgroundImageUrl, title, subText, buttonText } = this.props
    return (
      <div className="owl-backgroundImage container" style={{ backgroundImage: backgroundImageUrl }}>

        <Grid className={classes.slidePosition}>
          <Grid container/*  justify="center"  */ spacing={16}>
            <Grid item md={10} xs={12} className={classes}>
              <Paper className={classes.slideItem}>
                <Typography variant="h4" gutterBottom style={{ color: "white" }}>
                  {title}
                </Typography>
                <Typography variant="body1" className="justify-content-between" gutterBottom style={{ color: "white", display: "flex" }}>


                  <span>
                    {subText}
                  </span>
                  <QUTButton2>
                    {buttonText}
                  </QUTButton2>

                </Typography>




              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

QutSlideItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QutSlideItem);
