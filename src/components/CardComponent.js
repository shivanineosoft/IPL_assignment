import React from 'react'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

function CardComponent({name}) {
    return (
        <Card sx={{ minWidth: 100,float:'left',margin:'10px' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14,textAlign:'center' }} color="text.secondary" gutterBottom>
                    {name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Select</Button>
            </CardActions>
        </Card> 
    )
}

export default CardComponent
