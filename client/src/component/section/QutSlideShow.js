import React from "react";
import PropTypes from "prop-types";
import Slideshow from 'react-slidez';
import { withStyles } from "@material-ui/core/styles";



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
      <div>
        <Slideshow
          showIndex
          showArrows
          autoplay
          enableKeyboard
          useDotIndex
          slideInterval={2000}
          defaultIndex={1}
          slides={['/images/QUT1.jpg', '/images/QUT1.jpg']}
          effect={'fade'}
          height={'500px'}
          width={'100%'}
        />
      </div>
    );
  }
}

QutSlideShow.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QutSlideShow);
