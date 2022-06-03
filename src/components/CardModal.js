import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import React,{useEffect} from 'react'
import CardComponent from './CardComponent';

function CardModal() {

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setOpen(true);
    }, []);

    return (<>
    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Select Team
        </DialogTitle>
        <DialogContent>
            <CardComponent name="RCB"/>
            <CardComponent name="CSK"/>
            <CardComponent name="KKR"/>
            <CardComponent name="RR"/>
            <CardComponent name="MI"/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog></>
    )
}

export default CardModal
