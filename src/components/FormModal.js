import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material'
import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTeamDetail } from '../redux/playerSlice';
import PlayerList from './PlayerList';

function FormModal() {
  const open = useSelector(state => state.data.FormModal);
  const teamDetail = useSelector(state => state.data.teamDetail);
  const dispatch = useDispatch();
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
 
  const addPlayerDetail = ()=>{
    if(players.length > 10){
      alert('You have added all the players for this team.Please press continue for the next team.')
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
    }
    setData({
      name:'',
      category:'',
      isCaptain:false,
      isViceCaptain:false
    })
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

  const checkTeam = () =>{
    if(teamDetail.length > 0){
      const find = teamDetail.find((item,i) => item.players.length === 0)
      const index = teamDetail.findIndex((item,i) => item.players.length === 0)
      if(find){
        setTitle(find.name)
        setIndex(index)
      }
      else{
        alert('You have added all the players successfully.')
      }
    }
  }

  const isCaptainExist = ()=>{
    let _players = [...players]
    const find = players.find(item => item.isCaptain === true)
    if(!find){
      let _players = [...players]
      players[0].isCaptain = true
      setPlayers(_players)
    }
  }
  const isViceCaptainExist = ()=>{
    let _players = [...players]
    const find = players.find(item => item.isViceCaptain === true)
    if(!find){
      let _players = [...players]
      players[1].isViceCaptain = true
      setPlayers(_players)
    }
  }

  useEffect(() => {
    checkTeam()
    console.log('teamDetail',teamDetail)
  }, [teamDetail]);

  const handleContinue =()=>{
    if(players.length === 11){
      isCaptainExist()
      isViceCaptainExist()
      let _teamDetail = [...teamDetail]
      _teamDetail[index] = Object.assign({}, _teamDetail[index], {players:players})
      dispatch(addTeamDetail(_teamDetail))
      setPlayers([])
    }
    else{
      alert("Add details of all the players to continue.")
    }
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
        <DialogContent>
          <PlayerList players={players}/>
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
