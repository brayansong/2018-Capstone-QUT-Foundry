import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import QUTButton1 from "./QUTButton1"

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    backgroundPosition: "center",
    height: 215
  },
  textMaxHeight: {
    display: "block",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    overflow: "hidden",
    maxHeight: "4.5em",
    lineHeight: "1.5em"
  }
};

function MediaCard(props) {
  const { classes, date, title, contant, image } = props;
  return (
    <div className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
          <Typography variant="h5" >
            {title}
          </Typography>
          <Typography component="p" className={classes.textMaxHeight}>{contant}</Typography>
          <QUTButton1>See More</QUTButton1>
        </CardContent>
      </CardActionArea>
    </div>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
