import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { Redirect } from 'react-router-dom'
const styles = theme => ({
  card: {

    marginBottom: 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    "& span": {
      color: "white",
      fontSize: theme.typography.body1.fontSize
    },
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,


  },
  cardContent: {
    padding: 0
  },
  actionButton: {
    "& span": {
      fontSize: 12
    }

  },
  mrAuto: {
    marginRight: "auto"
  }
});

class RecipeReviewCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      redirect: ""
    }
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  edit = (idx) => {

    this.setState({
      redirect: "/" + this.props.title + "/" + idx
    })
  }
  add = () => {
    this.setState({
      redirect: "/" + this.props.title + "/create"
    })
  }
  render() {
    const { classes, data, ViewAll, title, onlyObject } = this.props;

    console.log("onlyObject")
    console.log(onlyObject)
    if (this.state.redirect != "") {
      return (<Redirect to={this.state.redirect} />)
    }

    return (
      <Card className={classes.card} >
        <CardHeader

          title={title}
          className={classes.cardHeader}
          action={
            <span>
              {this.props.Add === true ? (
                <Button onClick={this.add} size="small" className={classes.actionButton}>
                  Add
             </Button>
              ) : null}
              {this.props.Edit === true ? (
                <Button size="small" className={classes.actionButton}>
                  Edit
             </Button>
              ) : null}
            </span>
          }
        />

        <CardContent className={classes.cardContent}>
          <Typography component="p" >


            <List component="nav">

              {
                Object.keys(onlyObject).map((key, index) => (
                  <ListItem>
                    <strong className={classes.mrAuto}>   {key}:</strong>
                    {onlyObject[key]}
                  </ListItem>
                ))
              }
            </List>
          </Typography>
        </CardContent>

        {ViewAll === true ? (<CardActions className={classes.actions} disableActionSpacing>
          <Button>View all</Button>
        </CardActions>) : null}


      </Card >
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);