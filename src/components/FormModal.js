import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTeamDetail, toggleFormModal } from '../redux/playerSlice';
import PlayerList from './PlayerList';
import TeamList from './TeamList';

function FormModal() {
  const open = useSelector(state => state.data.FormModal);
  const teamDetail = useSelector(state => state.data.teamDetail);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [index, setIndex] = useState(0);
  const [showList, setList] = useState(false);
  const [players, setPlayers] = useState([]);
  const [data, setData] = useState({
    name:'',
    category:'',
    isCaptain:false,
    isViceCaptain:false
  });
 
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
        dispatch(toggleFormModal(false))
        setList(true)
      }
    }
  }

  const isCaptainExist = ()=>{
    const find = players.find(item => item.isCaptain === true)
    if(!find){
      let _players = [...players]
      players[0].isCaptain = true
      setPlayers(_players)
    }
  }
  const isViceCaptainExist = ()=>{
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
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">
        <h4>Add Player Details of {title} Team</h4>
        </DialogTitle>
        <form>
        <DialogContent>
              <div style={{margin:'10px'}}>
                  <TextField id="outlined-basic" type="text" label="Name" variant="outlined" 
                  value={data.name}
                  required
                  onChange={(e)=>{setData({...data,name:e.target.value})}} fullWidth/>
              </div>
              <div style={{margin:'10px'}}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data.category}
                    label="Category"
                    name="category"
                    onChange={(e)=>{setData({...data,category:e.target.value})}}
                  >
                  <MenuItem value="All-rounder">All-rounder</MenuItem>
                  <MenuItem value="Batsman">Batsman</MenuItem>
                  <MenuItem value="Bowler">Bowler</MenuItem>
                  <MenuItem value="Wicket keeper">Wicket keeper</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              </div>
              <div style={{margin:'10px'}}>
                  <label>Captain</label>
                  <Checkbox disabled={data.isViceCaptain} onChange={(e)=>{setData({...data,isCaptain:e.target.checked})}} checked={data.isCaptain}/>
                  <label>Vice-captain</label>
                  <Checkbox disabled={data.isCaptain} onChange={(e)=>{setData({...data,isViceCaptain:e.target.checked})}} checked={data.isViceCaptain}/>
              </div>
            <PlayerList players={players}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={addPlayerDetail} variant="contained" type="submit">Add Player Detail</Button>
          <Button onClick={handleContinue} variant="contained">Continue</Button>
        </DialogActions>
        </form>
      </Dialog>
      {showList && <TeamList />}
      </>
    )
}

export default FormModal
