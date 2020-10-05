import React, { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MyButton from "../../util/MyButton";

// other components
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

// Icons
// import ChatIcon from "@material-ui/icons/Chat";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";

// dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Redux
import { connect } from "react-redux";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
    width: "100%",
  },
  image: {
    minWidth: 200,
    minHeight: 600,
    // objectFit: "cover",
  },
  mediaImg: {
    width: "100%",
    // minHeight: 600,
    objectFit: "contain",
  },
  imageSM: {
    // width: "50%",
    // height: "auto",
    objectFit: "scale-down",
  },
  avaterImg: {
    width: 50,
    height: 50,
    objectFit: "cover",
    // borderRadius: "50%",
  },
  content: {
    padding: 25,
    // objectFit: "cover",
    // display: "flex",
    // flexDirection: "column",
    // position: "relative",
  },
  ScreamDialog: {
    left: "50%",
    buttom: "90%",
    position: "absolute",
  },
  title: {
    fontSize: 25,
    color: "#00BCD4",
  },
  avatar: {
    width: 50,
    height: 50,
  },
  h6: {
    fontWeight: "normal",
  },
};

function ScreamCard(props) {
  dayjs.extend(relativeTime);

  const {
    classes,
    open,
    handleClose,
    scream: {
      body,
      createdAt,
      userImage,
      imgUrl,
      userHandle,
      screamId,
      likeCount,
      commentCount,
    },
    user: {
      authenticated,
      credentials: { handle },
    },
  } = props;
  //   console.log({ imgUrl });
  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;
  // let w = window.innerWidth;

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          !open ? (
            <IconButton aria-label="settings">
              <ScreamDialog
                screamId={screamId}
                userHandle={userHandle}
                openDialog={props.openDialog}
              />
            </IconButton>
          ) : (
            <MyButton
              onClick={handleClose}
              tip="Expand scream"
              tipClassName={classes.closeButton}
            >
              <CloseIcon />
            </MyButton>
          )
        }
        classes={{
          title: classes.title,
          avatar: classes.avatar,
        }}
        title={`@${userHandle}`}
        subheader={dayjs(createdAt).fromNow()}
        avatar={
          <Avatar className={classes.avater}>
            <img src={userImage} alt="img" className={classes.avaterImg} />
          </Avatar>
        }
      />
      {imgUrl && (
        // <CardMedia className={classes.mediaImg} image={imgUrl} title="image" />
        <img src={imgUrl} alt="Post" className={classes.mediaImg} />
      )}
      <CardContent>
        <Typography className={classes.h6} variant="h6">
          {body}
        </Typography>

        {open ? null : (
          <Fragment>
            <LikeButton screamId={screamId} />
            <span>{likeCount} Likes</span>

            {/* <MyButton tip="comments">
              <ChatIcon color="primary" />
            </MyButton> */}
            <IconButton aria-label="settings">
              <ScreamDialog
                screamId={screamId}
                userHandle={userHandle}
                openDialog={props.openDialog}
                chatIcon
              />
            </IconButton>
            <span>{commentCount} comments</span>
            {deleteButton}
          </Fragment>
        )}
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps)(withStyles(styles)(ScreamCard));
