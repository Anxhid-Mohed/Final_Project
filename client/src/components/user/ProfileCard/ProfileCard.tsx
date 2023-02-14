import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, Chip } from '@mui/material';

const ProfileCard = () => {
    return (  
        <>
            <Card sx={{ maxWidth: 233 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="80"
                        image="https://library.sportingnews.com/styles/crop_style_16_9_mobile_2x/s3/2023-02/Lionel%20Messi%20PSG%20030922.jpg?itok=bwddpMZd"
                        alt="green iguana"
                    />
                    <CardMedia sx={{ml:'13px',mt:'-20px'}}>
                        <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 56, height: 56 }}
                        />
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            Mohammed anshy
                        </Typography>
                        <Typography>
                            1.5k Followers
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles...
                        </Typography>
                        <Chip label="Programmer" sx={{height:'32px',mt:0.5}}/>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
}
 
export default ProfileCard;