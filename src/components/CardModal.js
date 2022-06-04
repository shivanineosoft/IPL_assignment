import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import React,{useEffect,useState} from 'react'
import { useDispatch } from 'react-redux';
import { addTeamDetail, toggleFormModal } from '../redux/playerSlice';
import CardComponent from './CardComponent';
import FormModal from './FormModal';

function CardModal() {

    const [open, setOpen] = useState(false);
    const [arr, setArr] = useState([]);

    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };
    const handleSelect =(value,name)=>{
        let temp = {name:name,value:value,players:[]}
        let _arr = [...arr]
        _arr = _arr.filter((item) => item.name !== name)
        _arr.push(temp)
        _arr = _arr.filter(item => item.value === true)
        setArr(_arr)
    }
    const handleSave =()=>{
        if(arr.length === 0){
          alert('Please select team to continue.')
        }
        else{
          dispatch(addTeamDetail(arr))
          handleClose()
          dispatch(toggleFormModal(true))
        }
    }
    useEffect(() => {
        setOpen(true);
    }, []);

    return (<>
    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title">
        <b>Select Team</b>
        </DialogTitle>
        <DialogContent>
            <CardComponent name="RCB" handleSelect={handleSelect}/>
            <CardComponent name="CSK" handleSelect={handleSelect}/>
            <CardComponent name="KKR" handleSelect={handleSelect}/>
            <CardComponent name="RR" handleSelect={handleSelect}/>
            <CardComponent name="MI" handleSelect={handleSelect}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} variant="contained">Continue</Button>
        </DialogActions>
      </Dialog>
      <FormModal />
      </>
    )
}

export default CardModal
