import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import ImageIcon from "@material-ui/icons/Image";

// Redux stuff
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";
// import { uploadScreamImage } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
  closeButtonSM: {
    position: "absolute",
    left: "85%",
    top: "6%",
  },
});

class PostScream extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
    formData: {},
    fileInput: {},
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    // this.props.uploadScreamImage(formData);
    // console.log({ formData });

    this.setState({
      formData,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let imgBool = this.state.fileInput.exist ? true : false;
    this.props.postScream(
      { body: this.state.body },
      this.state.formData,
      imgBool
    );
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
    if (fileInput) {
      this.setState({
        fileInput: { exist: true },
      });
    }
    // console.log({ fileInput });
  };
  render() {
    // console.log("formData", this.state.formData.values);
    // console.log("fileInput state", this.state.fileInput);
    // this.state.fileInput.exist ? console.log("in") : console.log("out");
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;

    let w = window.innerWidth;

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a Scream!">
          <AddIcon />
        </MyButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={w > 600 ? classes.closeButton : classes.closeButtonSM}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="SCREAM!!"
                multiline
                rows="3"
                placeholder="Scream at your fellow apes"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <MyButton
                tip="Upload Image"
                onClick={this.handleEditPicture}
                btnClassName="button"
              >
                <ImageIcon fontSize="large" color="action" />
              </MyButton>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

// const mapActionsToProps = { uploadScreamImages };

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(PostScream)
);
