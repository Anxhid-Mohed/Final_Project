import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, Chip } from '@mui/material';
import Link from 'next/link';

const ProfileCard = ({data}:any) => {
    return (  
        <>  
            <Link legacyBehavior href={`/${data.username}`}>
                <Card  sx={{ maxWidth: 215,ml:2,boxShadow:2}}>
                    <CardActionArea >
                        <CardMedia
                            component="img"
                            height="80"
                            image={data ? data.coverImage :''}
                            alt="green iguana"
                        />
                        <CardMedia sx={{ml:'13px',mt:'-20px'}}>
                            <Avatar
                                alt="Remy Sharp"
                                src={data ? data.profile :''}
                                sx={{ width: 56, height: 56 }}
                            />
                        </CardMedia>
                        <CardContent >
                            <Typography gutterBottom variant="h6" component="div">
                                { data ? data.username :''}
                            </Typography>
                            <Typography>
                                1.5k Followers
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                { data ? data.about.substring(0,55) :''}
                            </Typography>
                            <Chip label={data ? data.category :''} sx={{height:'32px',mt:0.5}}/>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </>
    );
}
 
export default ProfileCard;