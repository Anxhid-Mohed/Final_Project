import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, Box } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const FeedCard = (data:any) => {
    function dateFormat(expirationdate: any, arg1: string): any {
        throw new Error("Function not implemented.");
    }

    return ( 
        <>
           <Card  sx={{ maxWidth:540,boxShadow:4,mt:2,ml:.5,borderRadius:'8px'}}>
                <CardHeader
                    avatar={
                        <Avatar alt="Travis Howard" src={ data ? data.data.userId.profile :'DP'}/>
                    }
                    action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title={ data ? data.data.userId.name :''}
                    subheader={data ? data.data.createdAt  :''}
                />
              
                    {
                        data.data.post && data.data.caption ? 
                        ( <>
                            <Box p={3}>
                                <CardMedia sx={{ height: '-webkit-fill-available', borderRadius: '8px' }}
                                    component="img"
                                    image={data ? data.data.post : ''}
                                    alt='' />
                            </Box>
                            <CardContent>
                                <Typography sx={{ ml: 1 }} variant="body2" color="text.secondary">
                                    {data.data.caption}
                                </Typography>
                            </CardContent>
                          </>
                        ):(
                            <Box p={3}>
                                <CardMedia sx={{height: '-webkit-fill-available',borderRadius:'8px'}}>
                                    <Typography sx={{lineBreak:'auto',fontSize:'16px'}} letterSpacing={1}>
                                        {data.data.caption}
                                    </Typography>
                                </CardMedia>
                            </Box>
                        )
                    }

                

                
                <CardActions  disableSpacing sx={{justifyContent:'space-between',p:2}} >
                    <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                    </IconButton>
                    <IconButton aria-label="comment">
                    <TextsmsIcon/>
                    </IconButton>
                    <IconButton aria-label="share">
                    <ShareIcon/>
                    </IconButton>
                </CardActions>
        
            </Card>
        </>
    );
}
 
export default FeedCard;