import Navbar from "@/components/user/NavBar/NavBar"
import SideBar from "@/components/user/SideBar/SideBar";
import styles from '@/styles/Explore.module.css';
import {BsCurrencyDollar} from 'react-icons/bs';
import {FcCurrencyExchange,FcLikePlaceholder} from 'react-icons/fc'
import { Avatar, Box, Button, Container, CssBaseline, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import Link from "next/link";

const Wallet = () => {

    const style = {fontSize:'41px'}
    return (  
        <>
            <Navbar/>
            <Container>
                <Grid item container sx={{display:'flex',mt:11}}>
                    <Grid item md={2.5} sx={{display: { xs: 'none', sm: 'none', md: 'block'} }}>
                        <SideBar/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9.5} sx={{lineBreak:'auto'}}>
                        <Container maxWidth='lg'>
                            <Grid item xs={12} sx={{width:'100%'}}></Grid>
                                <h3 style={{marginTop:'14px',fontWeight:'800'}}>Wallet And Payouts</h3>
                            <Grid item mt={3} mb={2} xs={12}  p={3.5} sx={{borderRadius:'15px',border:'1px solid #dedede',lineBreak:'auto'}}>
                                <Grid item xs={12} sx={{display:'flex',alignItems:'center'}}>
                                    <FcCurrencyExchange style={{fontSize:'23px'}}/>
                                    <Typography sx={{fontSize:'24px',fontWeight:'600',ml:0.3}} letterSpacing={1.5}>
                                        Earnings
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sx={{display:'flex',alignItems:'center',mt:1}}>
                                    <BsCurrencyDollar style={style}/>
                                    <Typography sx={{fontSize:'44px',fontWeight:'600'}} letterSpacing={1.5}>
                                        0
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sx={{display:'flex',alignItems:'center',mt:1}}>
                                    <Typography> 
                                      <span>100</span>  Donations
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item mt={3} mb={2} xs={12}  p={3.5} sx={{
                                borderRadius:'15px',
                                border:'1px solid #dedede',
                                lineBreak:'auto',
                                textAlign:'center',
                            }}
                            >
                                <FcLikePlaceholder style={{fontSize:'30px'}}/>
                                <Typography sx={{fontWeight:600,color:'#333232'}}>You dont have any supporters yet</Typography>
                                <Typography mt={1} sx={{color:'#333232'}}>Share your page with your audience to get started.</Typography>
                            </Grid>
                            <Grid item mt={3} mb={2} xs={12}  p={3.5} sx={{borderRadius:'15px',border:'1px solid #dedede',lineBreak:'auto'}}>
                                <Box className={styles.scrollBar} mt={2} sx={{overflowY:'scroll',overflowX:'hidden'}}>
                                    <Box sx={{ pb: 3,height: "450px" }}>
                                    <CssBaseline />  
                                    <List sx={{borderBottom:'1px solid #d6d6d6'}} >
                                        <ListItem button >
                                            <ListItemAvatar>
                                                <Avatar alt="Profile Picture" src=''/>
                                            </ListItemAvatar>
                                            <ListItemText sx={{lineBreak:'auto'}} primary={'bsdhcabvs'} />
                                            <ListItemText sx={{lineBreak:'auto'}} secondary={'donated 10$ for you'} />
                                            <FcLikePlaceholder style={{fontSize:'30px'}}/>
                                        </ListItem>       
                                    </List> 
                                    <List sx={{borderBottom:'1px solid #d6d6d6'}} >
                                        <ListItem button >
                                            <ListItemAvatar>
                                                <Avatar alt="Profile Picture" src=''/>
                                            </ListItemAvatar>
                                            <ListItemText sx={{lineBreak:'auto'}} primary={'bsdhcabvs'} />
                                            <ListItemText sx={{lineBreak:'auto'}} secondary={'donated 10$ for you'} />
                                            <FcLikePlaceholder style={{fontSize:'30px'}}/>
                                        </ListItem>       
                                    </List> 
                                    <List sx={{borderBottom:'1px solid #d6d6d6'}} >
                                        <ListItem button >
                                            <ListItemAvatar>
                                                <Avatar alt="Profile Picture" src=''/>
                                            </ListItemAvatar>
                                            <ListItemText sx={{lineBreak:'auto'}} primary={'bsdhcabvs'} />
                                            <ListItemText sx={{lineBreak:'auto'}} secondary={'donated 10$ for you'} />
                                            <FcLikePlaceholder style={{fontSize:'30px'}}/>
                                        </ListItem>       
                                    </List> 
                                    <List sx={{borderBottom:'1px solid #d6d6d6'}} >
                                        <ListItem button >
                                            <ListItemAvatar>
                                                <Avatar alt="Profile Picture" src=''/>
                                            </ListItemAvatar>
                                            <ListItemText sx={{lineBreak:'auto'}} primary={'bsdhcabvs'} />
                                            <ListItemText sx={{lineBreak:'auto'}} secondary={'donated 10$ for you'} />
                                            <FcLikePlaceholder style={{fontSize:'30px'}}/>
                                        </ListItem>       
                                    </List> 
                                    <List sx={{borderBottom:'1px solid #d6d6d6'}} >
                                        <ListItem button >
                                            <ListItemAvatar>
                                                <Avatar alt="Profile Picture" src=''/>
                                            </ListItemAvatar>
                                            <ListItemText sx={{lineBreak:'auto'}} primary={'bsdhcabvs'} />
                                            <ListItemText sx={{lineBreak:'auto'}} secondary={'donated 10$ for you'} />
                                            <FcLikePlaceholder style={{fontSize:'30px'}}/>
                                        </ListItem>       
                                    </List> 
                                    <List sx={{borderBottom:'1px solid #d6d6d6'}} >
                                        <ListItem button >
                                            <ListItemAvatar>
                                                <Avatar alt="Profile Picture" src=''/>
                                            </ListItemAvatar>
                                            <ListItemText sx={{lineBreak:'auto'}} primary={'bsdhcabvs'} />
                                            <ListItemText sx={{lineBreak:'auto'}} secondary={'donated 10$ for you'} />
                                            <FcLikePlaceholder style={{fontSize:'30px'}}/>
                                        </ListItem>       
                                    </List> 
                                    <List sx={{borderBottom:'1px solid #d6d6d6'}} >
                                        <ListItem button >
                                            <ListItemAvatar>
                                                <Avatar alt="Profile Picture" src=''/>
                                            </ListItemAvatar>
                                            <ListItemText sx={{lineBreak:'auto'}} primary={'bsdhcabvs'} />
                                            <ListItemText sx={{lineBreak:'auto'}} secondary={'donated 10$ for you'} />
                                            <FcLikePlaceholder style={{fontSize:'30px'}}/>
                                        </ListItem>       
                                    </List> 
                                    </Box>
                                </Box>
                            </Grid>
                        </Container>
                    </Grid>
                </Grid>
            </Container>                        
        </>
    );
}
 
export default Wallet;