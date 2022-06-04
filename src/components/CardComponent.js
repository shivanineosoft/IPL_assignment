import React,{ useState } from 'react'
import { Button, Card, CardActions, CardContent, Checkbox, Typography } from '@mui/material';

function CardComponent({name, handleSelect}) {

    const handleClick = (e)=>{
        handleSelect(e.target.checked,e.target.name)
    }
    return (
        <Card sx={{ minWidth: 100,float:'left',margin:'10px' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14,textAlign:'center' }}  gutterBottom>
                    <b>{name}</b>
                </Typography>
            </CardContent>
            <CardActions>
                <Checkbox onClick={handleClick} name={name}/>
            </CardActions>
        </Card> 
    )
}

export default CardComponent
