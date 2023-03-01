import { PostViews } from "@/Apis/adminApi/AdminListing";
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, Box, Menu, MenuItem, Modal, Button, TextField, Fade, ListItem, CssBaseline, List, ListItemAvatar, ListItemText, FormControl, InputLabel, Select, Container, Grid } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from "react";
import SideBar from "@/components/admin/SideBar/SideBar";
import NavBar from "@/components/admin/NavBar/NavBar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";



export const getServerSideProps = async (context:any) => {
    try {
        const postId = context.params.postId 
        const response = await PostViews(postId)
       
        return {
            props :{data:response?.data}
        }

    } catch (error) {
        console.log(error);
    }
}

const PostView = ({data}:any) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const styles = {marginRight:'6px'}
    return (  
        <>
            <NavBar/>
            <Container>
                <Grid item container sx={{display:'flex',mt:11}}>
                    <Grid item md={2.5} sx={{display: { xs: 'none', sm: 'none', md: 'block'} }}>
                        <SideBar/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9.5} sx={{lineBreak:'auto'}}>
                        <Container maxWidth='lg'>
                            <Grid item xs={12} sx={{width:'100%'}}>
                                <h3 style={{marginTop:'14px',fontWeight:'800'}}>Repoted Post</h3>
                                <Grid item mt={3} mb={2} xs={12}  p={3.5} sx={{borderRadius:'15px',lineBreak:'auto'}}>
                                    <Card  sx={{ maxWidth:540,boxShadow:4,mt:2,ml:.5,borderRadius:'8px'}}>
                                        <CardHeader
                                            avatar={
                                                <Avatar alt="Travis Howard" src={data ? data.userId.profile :''} />
                                            }
                                            action={
                                            <>
                                                <IconButton 
                                                    id="basic-button"
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </>
                                            }
                                            title={data ? data.userId.name :''}
                                            subheader={moment(data.createdAt).format("DD/MM/YYYY")}
                                        />
                                    
                                            {
                                                data.post && data.caption ? 
                                                (<>
                                                    <Box p={3}>
                                                        <CardMedia sx={{ height: '-webkit-fill-available', borderRadius: '8px' }}
                                                            component="img"
                                                            image={data.post}
                                                            alt='' />
                                                    </Box>
                                                    <CardContent>
                                                        <Typography sx={{ ml: 1 }} variant="body2" color="text.secondary">
                                                            {data.caption}
                                                        </Typography>
                                                    </CardContent>
                                                </>
                                                ):( 
                                                    <Box p={3}>
                                                        <CardMedia sx={{height: '-webkit-fill-available',borderRadius:'8px'}}>
                                                            <Typography sx={{lineBreak:'auto',fontSize:'16px'}} letterSpacing={1}>
                                                               {data.caption}
                                                            </Typography>
                                                        </CardMedia>
                                                    </Box>
                                                )
                                            }

                                        <CardActions  disableSpacing sx={{justifyContent:'space-between',p:2}} >
                                            <IconButton aria-label="add to favorites"
                                            >
                                            <FavoriteIcon style={{color:'#f73f31'}}/> 
                                            </IconButton>
                                        
                                            <IconButton aria-label="comment">
                                                <TextsmsIcon/>
                                            </IconButton>

                                            <IconButton aria-label="share">
                                            <ShareIcon/>
                                            </IconButton>
                                        </CardActions>
                                        <CardActions  disableSpacing sx={{justifyContent:'space-between',p:3.8,marginTop:'-40px'}} >
                                            <span>{ data ? data.like.length :''}</span>
                                            <span>{ data ? data.like.length :''}</span>
                                            <span>-</span>
                                        </CardActions>
                                
                                    </Card>
                                </Grid>
                            </Grid>
                        </Container>   
                    </Grid>            
                </Grid>           
            </Container>  
        </>
    );
}
 
export default PostView;