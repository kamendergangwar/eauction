import * as React from 'react';
import { Button, Dialog, DialogTitle, DialogActions, Slide, DialogContent, DialogContentText, Typography } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AgentDeleteDialoogBox(props) {
  const { openDeleteDialog, onClose, leadData } = props;



  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => onClose(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you Want to Delete this lead?"}</DialogTitle>
        <DialogContent>
          {leadData.mobileNo && <Typography gutterBottom><strong>Name : </strong>{leadData.name}</Typography>}
          {leadData.mobileNo && <Typography><strong>Mobile No. : </strong>{leadData.mobileNo}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "#f44336" }} onClick={() => onClose(false)}>Delete</Button>
          <Button onClick={() => onClose(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}