import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';

function TeamList() {
    const teamDetail = useSelector(state => state.data.teamDetail);
    return (
        
        <div style={{width:'50%',textAlign:'center',margin:'40px'}}>
            <h4>Team List with player detail</h4>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Team</b></TableCell>
                            <TableCell align="right"><b>Name</b></TableCell>
                            <TableCell align="right"><b>Captian/Vice-Captain</b></TableCell>
                            <TableCell align="right"><b>Category</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teamDetail.map(item => (
                            item.players.map((row) => {
                                return <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {item.name}
                                            </TableCell>
                                            <TableCell align="right">{row.name}</TableCell>
                                            <TableCell align="right">{row.isCaptain ? 'Captain' : (row.isViceCaptain ? 'Vice-Captain' :'-')}</TableCell>
                                            <TableCell align="right">{row.category}</TableCell>
                                        </TableRow>
                            })
                        ))}
                    
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        
    )
}

export default TeamList
