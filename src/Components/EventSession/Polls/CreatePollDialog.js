import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
// import { createNewRoom } from "../../Modules/eventSessionOperations";
// import { useSnackbar } from "material-ui-snackbar-provider";
import { v1 as uuidv1 } from "uuid";
import { HelpCircle as InfoIcon } from "react-feather";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// import { useSelector, shallowEqual } from "react-redux";
// import {
//   getSessionId,
//   getUserId,
//   getUserLiveGroup
// } from "../../Redux/eventSession";
// import Alert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  FormControlLabel,
  Checkbox,
  Tooltip,
  SvgIcon,
  Typography,
  IconButton
} from "@material-ui/core";
import DialogClose from "../../Misc/DialogClose";
const useStyles = makeStyles((theme) => ({
  content: {
    position: "relative"
    // width: theme.breakpoints.values.sm
    // padding: theme.spacing(6),
    // textAlign: "center"
  },
  dialog: {
    width: theme.breakpoints.width.sm
  },
  closeContainer: {
    position: "absolute"
  },
  buttonContainer: {
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing(2)
  },
  hintText: {
    marginBottom: theme.spacing(4),
    display: "block",
    width: 400,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(2)
  },
  emptySpaceBottom: {
    marginBottom: theme.spacing(4)
  },
  participantContainer: {
    marginBottom: theme.spacing(3)
  },
  alert: {
    marginTop: theme.spacing(2)
  },
  avatarsContainer: {
    padding: theme.spacing(3)
  },
  avatar: {
    margin: theme.spacing(0.5)
  },
  dialogTitle: {
    color: theme.palette.primary.main
  },
  button: {
    margin: theme.spacing(2)
  },
  infoIcon: {
    marginTop: theme.spacing(1.25)
  }
}));

const getPollOptionData = (value) => {
  const id = uuidv1();
  return {
    id,
    value
  };
};

export const CreatePollDialog = ({ open, setOpen }) => {
  const classes = useStyles();
  // const snackbar = useSnackbar();
  let [title, setTitle] = useState("");
  let [options, setOptions] = useState([
    getPollOptionData(""),
    getPollOptionData("")
  ]);
  const [checkedAnonymous, setCheckedAnonymous] = useState(true);
  const [checkedNotification, setCheckedNotification] = useState(false);
  // const userGroup = useSelector(getUserLiveGroup, shallowEqual);
  // const sessionId = useSelector(getSessionId);
  // const userId = useSelector(getUserId);

  const handleClose = () => {
    setOptions([getPollOptionData(), getPollOptionData()]);
    setTitle("");
    setOpen(false);
  };

  const handleCreatePoll = (e) => {
    e.preventDefault();
    console.log(options);
    // createNewRoom(sessionId, roomName, userId, userGroup, snackbar);
    handleClose();
  };

  const handleOptionChange = (index) => (e) => {
    const value = e.target.value;
    let values = [...options];
    values[index].value = value;
    setOptions(values);
  };

  const handleNewOption = () => {
    setOptions((v) => [...v, getPollOptionData("")]);
  };

  const handleDeleteOption = (index) => () => {
    let newValues = _.remove(options, (v, i) => {
      console.log({ i, index });
      return i !== index;
    });
    setOptions(newValues);
  };

  // Reorder tutorial: https://codesandbox.io/s/4qp6vjp319?file=/index.js:0-3573
  return (
    <div>
      <DialogClose
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        fullWidth
        maxWidth="xs"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle className={classes.dialogTitle}>
          Create new poll
        </DialogTitle>
        <DialogContent>
          <div className={classes.content}>
            {/* <Typography
            color="primary"
            variant="h4"
            align="center"
            style={{ marginBottom: 16 }}
          >
            Create new room
          </Typography> */}
            <TextField
              autoFocus
              label="Title"
              name="title"
              variant="outlined"
              value={title}
              // style={{ width: "50%" }}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />
            <Box pl={3}>
              {options.map((option, index) => (
                <Box display="flex" mt={2} key={option.id}>
                  <TextField
                    label={"Option " + (index + 1)}
                    name={"option" + index}
                    // variant="outlined"
                    value={option.value}
                    // style={{ width: "50%" }}
                    // onChange={(e) => setTitle(e.target.value)}
                    onChange={handleOptionChange(index)}
                    required
                    fullWidth
                  />
                  {index > 1 && (
                    <IconButton
                      aria-label="delete"
                      onClick={handleDeleteOption(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>
            <Box textAlign="center" m={2}>
              <Button
                color="primary"
                variant="outlined"
                onClick={handleNewOption}
                startIcon={<AddCircleOutlineIcon />}
              >
                New option
              </Button>
            </Box>
            <Box>
              <Box display="flex">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedAnonymous}
                      onChange={(e) => setCheckedAnonymous(e.target.checked)}
                      name="checkedAnonymous"
                      color="primary"
                      disabled
                    />
                  }
                  label={
                    <Typography variant="body2">Anonymous poll</Typography>
                  }
                />
                <Tooltip title="The individual votes of attendees will not be tracked. Not yet available, all votes are anonymous so far.">
                  <SvgIcon
                    fontSize="small"
                    color="action"
                    className={classes.infoIcon}
                  >
                    <InfoIcon />
                  </SvgIcon>
                </Tooltip>
              </Box>
              <Box display="flex">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedNotification}
                      onChange={(e) => setCheckedNotification(e.target.checked)}
                      name="checkedNotification"
                      color="primary"
                      disabled
                    />
                  }
                  label={
                    <Typography variant="body2">
                      Notify all attendees
                    </Typography>
                  }
                />
                <Tooltip title="A notification dialog will be shown to all attendees with the new poll. Not yet available, active polls are visible on the polls pane so far.">
                  <SvgIcon
                    fontSize="small"
                    color="action"
                    className={classes.infoIcon}
                  >
                    <InfoIcon />
                  </SvgIcon>
                </Tooltip>
              </Box>
            </Box>
            {/* <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleCreateRoom}
              disabled={roomName.trim() === ""}
            >
              Create
            </Button>
          </div> */}
            {/* <Alert severity="info" className={classes.alert}>
              A room will be created with this name and any attendee will be
              able to join it
            </Alert> */}
            {/* {userGroup && (
            <Alert severity="warning" className={classes.alert}>
              You will leave your current call
            </Alert>
          )} */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            className={classes.button}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreatePoll}
            className={classes.button}
            color="primary"
            variant="outlined"
          >
            Save draft
          </Button>
          <Button
            onClick={handleCreatePoll}
            className={classes.button}
            color="primary"
            variant="contained"
          >
            Publish
          </Button>
        </DialogActions>
      </DialogClose>
    </div>
  );
};
