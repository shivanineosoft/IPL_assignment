import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'

function PlayerList({ players }) {
    return (
        <div>
            <List>
            {players.length > 0 && <h4>Players List</h4>}
            {players.map((item,i) => {
                return  <ListItem disablePadding>
                            <ListItemText primary={item.name+ ' , ' + item.category + (item.isCaptain ? ' , Captain' : '') + 
                            (item.isViceCaptain ? ', Vice Captain' : '')} />
                        </ListItem>
            })} 
            </List>
        </div>
    )
}

export default PlayerList
