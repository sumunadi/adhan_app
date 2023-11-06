import React from 'react';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const PrayerCard = ({ prayer }) => {
    //format from API is in UTC, converting that in to readable time format
    const prayerTimeUTC = new Date(prayer.time).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        timeZone: 'UTC' 
      });

    return(
        <Card variant="outlined" sx={{ margin: 2}}>
        <CardContent>
            <Typography color="textSecondary" gutterButton>
                {prayer.name}
            </Typography>
            <Typography variant="h5">
                {prayerTimeUTC}
            </Typography>
        </CardContent>
        </Card>
    );
};

export default PrayerCard;

