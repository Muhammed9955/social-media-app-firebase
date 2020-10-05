import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
// import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
// import dayjs from "dayjs";
// import { Link } from "react-router-dom";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// Icons
import CloseIcon from "@material-ui/icons/Close";
// import UnfoldMore from "@material-ui/icons/UnfoldMore";
// import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";

// Redux stuff
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";
import ScreamCard from "../scream/ScreamCard";

const styles = (theme) => ({
  ...theme,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  profileImageSM: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
    // padding: "0 40% 0 40%",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    // position: "absolute",
    left: "90%",
  },
  closeButtonSM: {
    position: "absolute",
    left: "85%",
  },
  expandButton: {
    // position: "absolute",
    // left: "90%",
    padding: "0 .1rem 0 .1rem",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  contianer: {
    display: "flex",
    displayDirection: "column",
  },
});

class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, screamId } = this.props;
    const newPath = `/users/${userHandle}/scream/${screamId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getScream(this.props.screamId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    // let w = window.innerWidth;
    // console.log({ w });

    const {
      classes,
      chatIcon,
      scream: {
        screamId,
        // body,
        // createdAt,
        // likeCount,
        // commentCount,
        // userImage,
        // userHandle,
        comments,
      },
      UI: { loading },
    } = this.props;
    const { scream } = this.props;
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        {/* <Grid item sm={5}>
          <img
            src={userImage}
            alt="Profile"
            className={w > 400 ? classes.profileImage : classes.profileImageSM}
          />
        </Grid> */}
        {/* <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>

          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>

          <LikeButton screamId={screamId} />
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
         */}

        <ScreamCard
          scream={scream}
          open={this.state.open}
          handleClose={this.handleClose}
        />
        {/* <hr className={classes.visibleSeparator} /> */}
        <CommentForm screamId={screamId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        {this.state.open ? (
          <MyButton
            onClick={this.handleClose}
            tip="Expand scream"
            tipClassName={classes.expandButton}
          >
            <CloseIcon />
          </MyButton>
        ) : (
          <MyButton
            onClick={this.handleOpen}
            tip="Expand scream"
            tipClassName={classes.expandButton}
          >
            {chatIcon ? <ChatIcon color="primary" /> : <MoreVertIcon />}
          </MyButton>
        )}
        {this.state.open && (
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth="sm"
          >
            <DialogContent className={classes.dialogContent}>
              {dialogMarkup}
            </DialogContent>
          </Dialog>
        )}
      </Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
});

const mapActionsToProps = {
  getScream,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
