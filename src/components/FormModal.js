import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material'
import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';

function FormModal() {
  const open = useSelector(state => state.data.FormModal);
  const teamDetail = useSelector(state => state.data.teamDetail);
  const [title, setTitle] = useState('');
  const [index, setIndex] = useState(0);

  const [players, setPlayers] = useState([]);
  const [data, setData] = useState({
    name:'',
    category:'',
    isCaptain:false,
    isViceCaptain:false
  });

  const handleClose = () => {
      // setOpen(false);
  };
  useEffect(() => {
    if(teamDetail.length > 0){
       setTitle(teamDetail[0].name)
    }
  }, [teamDetail]);

  const addPlayerDetail = ()=>{
    if(players.length > 10){
      console.log('-----errr---')
    }
    else{
      let _players = [...players]
      if(data.isCaptain){
        checkCaptain()
      }
      if(data.isViceCaptain){
        checkViceCaptain()
      }
      _players.push(data)
      setPlayers(_players)
  
      setData({
        name:'',
        category:'',
        isCaptain:false,
        isViceCaptain:false
      })
    }
    
  }

  const checkCaptain = ()=>{
    let _players = [...players]
    _players.map((item,inx)=>{
      if(item.isCaptain){
        item.isCaptain = false
      }
    })
    setPlayers(_players)
  }

  const checkViceCaptain = ()=>{
    let _players = [...players]
    players.map((item,inx)=>{
      if(item.isViceCaptain){
        item.isViceCaptain = false
      }
    })
    setPlayers(_players)
  }

  const handleContinue =()=>{
      console.log(1111,players)
  }

    return (<>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">
          Add Player Details of {title} Team
        </DialogTitle>
        <DialogContent>
            <div>
                <input type="text" className="text-input" 
                placeholder="Enter Player Name" name="name" 
                value={data.name}
                onChange={(e)=>{setData({...data,name:e.target.value})}}
                style={{height:'40px'}}/>
            </div>
            <div>
              <select 
              onChange={(e)=>{setData({...data,category:e.target.value})}}
              name="category" value={data.category}>
                <option value="">Select</option>
                <option value="All-rounder">All-rounder</option>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="Wicket keeper">Wicket keeper</option>
              </select>
            </div>
            <div>
                <label>Captain</label>
                <Checkbox disabled={data.isViceCaptain} onChange={(e)=>{setData({...data,isCaptain:e.target.checked})}} checked={data.isCaptain}/>
            </div>
            <div>
                <label>Vice-captain</label>
                <Checkbox disabled={data.isCaptain} onChange={(e)=>{setData({...data,isViceCaptain:e.target.checked})}} checked={data.isViceCaptain}/>
            </div>
            <div>
              <Button onClick={addPlayerDetail} variant="contained">Add Player Detail</Button>
            </div>
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleContinue}>Continue</Button>
          <Button onClick={handleClose} autoFocus type="button">
            Close
          </Button>
        </DialogActions>
      </Dialog></>
    )
}

export default FormModal
