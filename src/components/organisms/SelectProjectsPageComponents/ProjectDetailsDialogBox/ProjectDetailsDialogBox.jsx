import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import ProjectDetailsTabs from "../ProjectDetailsTabs/ProjectDetailsTabs";

const ProjectDetailsDialogBox = (props) => {
  const { onClose, selectedValue, open, projectDetails } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      fullScreen
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
    >
      <Box display="flex" alignItems="center">
        <Box flexGrow={1}>
          <DialogTitle id="alert-dialog-title">Project Details</DialogTitle>
        </Box>
        <Box p={1}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <DialogContent>
        <Box borderRadius="borderRadius">
          <img
            style={{ height: 150, width: "100%", borderRadius: 5 }}
            src={projectDetails.images[0]}
            alt="Building  Img"
          />
        </Box>
        <Box marginTop={1}>
          <Typography variant="h6" gutterBottom>
            {projectDetails.title}
          </Typography>
        </Box>
        <ProjectDetailsTabs moreDetails={projectDetails} />
      </DialogContent>
      {/* <Box paddingX={2}>
        <DialogActions>
          <Button
            fullWidth
            variant={selectedValue ? "contained" : "outlined"}
            startIcon={selectedValue ? null : <CheckOutlinedIcon />}
            color="primary"
          >
            {selectedValue ? "Deselect Project" : "Select Project"}
          </Button>
        </DialogActions>
      </Box> */}
    </Dialog>
  );
};

export default ProjectDetailsDialogBox;
