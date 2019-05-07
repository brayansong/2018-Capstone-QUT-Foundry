import React from "react";
import PropTypes from "prop-types";
import Slideshow from 'react-slidez';
import { withStyles } from "@material-ui/core/styles";
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/src/owl.carousel.css'; //Allows for server-side rendering.

import Typography from "@material-ui/core/Typography";
import QutSlideItem from "./QutSlideItem";

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
const options = {
  items: 1,
  nav: true,
  rewind: true,
  autoplay: true
};

const events = {
  /*   onDragged: function (event) {...},
    onChanged: function(event) { ...} */
};

class QutSlideShow extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, children, content, title } = this.props;
    const { value } = this.state;

    return (
      <OwlCarousel ref="car" options={options} events={events}  >
        <QutSlideItem
          backgroundImageUrl="url('/images/QUT1.jpg')"
          title="Foundry Information"
          subText="Our science, engineering and mathematics (STEM) camp invites Year 11 students to a five-day research-intensive camp."
          buttonText="Check To see more information"
        />
        <QutSlideItem
          backgroundImageUrl="url('/images/QUT-Media-4-1.jpg')"
          title="Foundry Information"
          subText="Our science, engineering and mathematics (STEM) camp invites Year 11 students to a five-day research-intensive camp."
          buttonText="Check To see more information"
        />


      </OwlCarousel>
    );
  }
}

QutSlideShow.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QutSlideShow);
