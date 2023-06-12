import React, { useEffect } from "react";
import ProfileCard from "@/components/user/ProfileCard/ProfileCard";
import SideBar from "@/components/user/SideBar/SideBar";
import { alpha, Box, Container, Grid, InputBase, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import styles from '@/styles/Explore.module.css';
import { FcApproval } from "react-icons/fc";
import { tokenVerification } from "@/Apis/userApi/userAuthRequest";
import router from "next/router";
import { getAllCreaters, searchCreaters } from "@/Apis/userApi/userPageRequests";
import Navbar from "@/components/user/NavBar/NavBar";
import { userDetails } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius:'30px',
    border:'2px solid #a6a5a4',
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    height:'50px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    color:'#787775',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      height:'33px',
      [theme.breakpoints.up('md')]: {
        width: '40ch',
      },
    },
}));

const Explore = () => {

    const {user} = useSelector((state:any)=>state.userInfo)
    const dispatch = useDispatch()
    const [search ,setSearch] = React.useState()
    const [creaters, setCreaters] = React.useState([])


    useEffect(()=>{
        let token = localStorage.getItem('userToken')
        if(token){
           (
                async () => {
                    const response = await tokenVerification(token);
                    console.log(response);
                    if(response.status == false || response.isBanned === true){
                        router.push('/auth')
                    }else if (response.isAuthenticated && response.isBanned === false){
                        dispatch(userDetails(response))
                    }else{
                        router.push('/auth')
                    }
                }
            )()
        }else{
          router.push('/auth')
        }
    },[])

    useEffect(()=>{
        (
            async ()=> {
                const response = await getAllCreaters()
                if(response.status === true){
                    setCreaters(response.data);
                    console.log(response.data);
                }
            }
        )()
    },[])

    const style = {marginTop:'17px',fontSize:'1.3rem'}
    return (  
        <>
          <Container>
            <Navbar/>
            <Grid item container sx={{display:'flex',mt:11}}>
               <Grid item md={2.5} sx={{display: { xs: 'none', sm: 'none', md: 'block'}}} >
                   <SideBar userData={user?.username}/>
               </Grid>
               <Grid item xs={12} sm={12} md={9.5} sx={{lineBreak:'auto'}}>
                    <Container maxWidth='lg'>
                        <Grid item xs={12} sx={{width:'100%'}}>
                            <h3 style={{marginTop:'14px',fontWeight:'800'}}>Explore</h3>
                            <Grid mt={3} xs={12}  p={3} sx={{borderRadius:'15px',border:'1px solid #dedede'}}>
                                <Search>
                                    <SearchIconWrapper>
                                    <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                    onChange={async (e:any)=>{
                                        const response = await searchCreaters(e.target.value)
                                        if(response.status === true){
                                            setCreaters(response.data)
                                        }else{
                                            console.log('no creaters found')
                                        }
                                    }}
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                            </Grid>

                            <Grid item xs={12} sx={{display:'flex',ml:2}}>
                                <h3 style={{marginTop:'15px',fontWeight:'800'}}>Creators</h3>
                                <FcApproval style={{...style,marginLeft:'5px'}}/>
                            </Grid>
                            
                            <Grid mt={3} xs={12}  p={2} sx={{borderRadius:'15px'}}>
                                <Box p={2} className={styles.scrollBar} sx={{
                                    display:'-webkit-box',
                                    overflowX:'scroll',
                                    overflowY:'hidden',
                                    WebkitScrollSnapType:'none',
                                    WebkitOverflowScrolling:'touch',
                                    
                                }}>

                                {
                                    creaters.map((creater:any)=>{
                                        return(
                                            <ProfileCard key={creater._id} data={creater}/>
                                        )
                                    })   
                                }
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
               </Grid>
            </Grid>
          </Container>
        </>
    );
}
 
export default Explore;

