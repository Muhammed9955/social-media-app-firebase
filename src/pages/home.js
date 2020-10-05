import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { Link } from "react-router-dom";

// import Scream from "../components/scream/Scream";
import ScreamCard from "../components/scream/ScreamCard";
// import Profile from "../components/profile/Profile";
import ScreamSkeleton from "../util/ScreamSkeleton";

import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme,
});

class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const {
      data: { screams, loading },
      classes,
    } = this.props;
    console.log("screams", screams);
    // console.log({ classes });
    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => (
        <ScreamCard key={scream.screamId} scream={scream} />
      ))
    ) : (
      <ScreamSkeleton />
    );

    let Login = (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login first to create new post
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    );
    const authenticated = this.props.user.authenticated;
    return (
      <Grid container spacing={16} justify="center">
        {authenticated ? (
          <Grid item sm={6} xs={12}>
            {recentScreamsMarkup}
          </Grid>
        ) : (
          <Fragment>
            <Grid item sm={4} xs={12}>
              {Login}
            </Grid>
            <Grid item sm={8} xs={12}>
              {recentScreamsMarkup}
            </Grid>
          </Fragment>
        )}
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, { getScreams })(
  withStyles(styles)(home)
);
