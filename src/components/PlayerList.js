import React from 'react'

function PlayerList({ players }) {
    return (
        <div>
            {players.map((item,i) => {
                return<li key={i}>{item.name+ ' , ' + item.category + (item.isCaptain ? ' , Captain' : '') + 
                (item.isViceCaptain ? ', Vice Captain' : '')}</li>
            })}
        </div>
    )
}

export default PlayerList
