/* eslint-disable @next/next/no-img-element */
import React,{ useEffect, useRef, useState } from "react";
import SideBar from "@/components/user/SideBar/SideBar";
import Navbar from "@/components/user/NavBar/NavBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, Container, Fade, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "@/firebase/config";
import { useDispatch, useSelector } from 'react-redux';
import { userProfileUpdate } from "@/Apis/userApi/userManagement";
import { tokenVerification } from "@/Apis/userApi/userAuthRequest";
import router from "next/router";
import { userDetails } from "@/redux/userSlice";
import { setSuccessMsg } from "./integration";
import { setErrMsg } from "@/components/user/PostPage/Post";


const ITEM_HEIGHT = 38;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const names = [
    'Programmer',
    'gamer',
    'Bloger',
    'story publisher',
    'gamer',
    'Bloger',
    'story publisher',
 ];

const ManageAccount = () => {

    const { user } = useSelector((state:any)=>state.userInfo)
    
    const dispatch = useDispatch();
    const ProfileImg:any = useRef()
    const [profile, setProfile] = React.useState<File[]>([]);
    const [category, setCategory] = React.useState('');
    const [users , setUsers] = React.useState('')

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

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
                        setUsers(response.userId)
                        
                    }else{
                        router.push('/auth')
                    }
                }
            )()
        }else{
          router.push('/auth')
        }
    },[])


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let dir = Date.now();
        let random = Math.random();
        const profileRef = ref(storage,'profiles/'+dir+random+'/'+profile[0]?.name)
        const toBase64 = (imgData:any) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(imgData);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        }).catch((err) => {
            console.log(err);
        });
        const imgBase:any = await toBase64(profile[0]);
        await uploadString(profileRef,imgBase,'data_url').then(async()=>{
            const downloadURL = await getDownloadURL(profileRef);
            console.log(downloadURL);
            
            let obj = {
                profile: downloadURL,
                name: data.get("name"),
                about: data.get("about"),
                category:category,
                social: data.get("social"),
                userId:users
            };
            const response = await userProfileUpdate(obj)
            if(response.status === true){
                setSuccessMsg(response.message)
            }else{
                setErrMsg(response.message)
            }
        
        })
        console.log(profile[0].name)
    }
    console.log(user?.username);
    
    const styles = { fontSize: "1.8em",color:'#ababab'}
    return (  
        <>
            <Navbar/>
            <ToastContainer/>
            <Container>
                <Grid item container sx={{display:'flex',mt:11}}>
                    <Grid item md={2.5} sx={{display: { xs: 'none', sm: 'none', md: 'block'} }}>
                        <SideBar userData={user?.username}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9.5} sx={{lineBreak:'auto'}}>
                        <Container maxWidth='lg' >
                            <Grid item xs={12} sx={{width:'100%'}}>
                                <h3 style={{marginTop:'14px',fontWeight:'800'}}>Manage Account</h3>
                                <Grid item mt={3} mb={2} xs={12}  p={3.5} boxShadow={1} sx={{borderRadius:'15px',border:'1px solid #dedede',lineBreak:'auto'}}>
                                    <Box
                                      component="form"
                                      noValidate
                                      onSubmit={handleSubmit}
                                    >
                                        <Grid item sx={{textAlign:' -webkit-center'}}>
                                            <Box 
                                            onClick={()=>ProfileImg.current.click()}
                                            sx={{
                                                height:'150px',
                                                width:'150px',
                                                borderRadius:'50%',
                                                display:'flex',
                                                justifyContent:'center',
                                                alignItems:'center',
                                                border:'2px dashed #ababab',
                                                objectFit:'cover',
                                                cursor:'pointer',
                                                
                                            }}>
                                            <img style={{
                                                height:'150px',
                                                width:'150px',
                                                borderRadius:'50%',
                                                objectFit:'cover',
                                                justifyContent:'center',
                                                alignItems:'center',
                                                cursor:'pointer',
                                            }} src={profile.length>0 ? URL?.createObjectURL(profile[0]):''}  alt="" />
                                                <input 
                                                    type="file"
                                                    name="profile"
                                                    ref={ProfileImg}
                                                    onChange={(e:any)=>{
                                                        let allowFormats = /(\.jpg|\.jpeg|\.png|\.gif)$/i
                                                        let fileType = e.target.files[0].name
                                                        if(!allowFormats.exec(fileType)){
                                                            setErrMsg('Invalid file type: ')
                                                        }else{
                                                            setProfile(e.target.files)
                                                        }
                                                    }}
                                                    hidden
                                                />
                                            </Box>
                                            <Typography mt={1} sx={{color:'#6b6b6b'}}>Profile</Typography>
                                        </Grid>
                                        <Grid mt={4} item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="name"
                                                // label="Name"
                                                defaultValue={user ? user.name:'' }
                                                type="text"
                                                id="name"
                                                multiline
                                                autoComplete="new-name"
                                                sx={{
                                                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},
                                                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#f22c50"}},
                                                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                                                }}
                                            />
                                        </Grid>
                                        <Grid mt={4} item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="about"
                                                // label="About"
                                                defaultValue={user ? user.about :''}
                                                type="text"
                                                id="about"
                                                autoComplete="about"
                                                placeholder="Hey 👋 I just created a page here. Make a day for me !"
                                                multiline
                                                rows={3}
                                                sx={{
                                                    "& .MuiInputLabel-root.Mui-focused": { color: "#4f4e4e" },
                                                    "& .MuiOutlinedInput-root.Mui-focused": {
                                                    "& > fieldset": { borderColor: "#f22c50" },
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                    "& fieldset": { borderRadius: 3 },
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid mt={4} item xs={12}>
                                                <FormControl fullWidth sx={{
                                                    "& .MuiInputLabel-root.Mui-focused": { color: "#4f4e4e" },
                                                    "& .MuiOutlinedInput-root.Mui-focused": {
                                                    "& > fieldset": { borderColor: "#f22c50" },
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                    "& fieldset": { borderRadius: 3 },
                                                    },
                                                }}>
                                                    <InputLabel id="demo-simple-select-label">What do you do? </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        defaultValue={category}
                                                        label="What do you do?"
                                                        onChange={handleChange}
                                                        MenuProps={MenuProps}
                                                    >
                                                        {names.map((name) =>(
                                                            <MenuItem key={name} value={name}>
                                                                {name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                        </Grid>
                                        <Grid mt={4} item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="social"
                                                // label="Website or social link"
                                                defaultValue={user? user.socialLink :''}
                                                placeholder="https://"
                                                name="social"
                                                autoComplete="social"
                                                multiline
                                                sx={{
                                                    "& .MuiInputLabel-root.Mui-focused": { color: "#4f4e4e" }, //styles the label
                                                    "& .MuiOutlinedInput-root.Mui-focused": {
                                                    "& > fieldset": { borderColor: "#f22c50" },
                                                    },
                                                    "& .MuiOutlinedInput-root": {
                                                    "& fieldset": { borderRadius: 3 },
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid  mt={3} item xs={12}>
                                            <Button
                                                fullWidth
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    mt: 2,
                                                    mb: 2,
                                                    borderRadius: "15px",
                                                    height: "42px",
                                                    backgroundColor: "#eb1e44",
                                                    "&:hover": { backgroundColor: "#eb1e44"},
                                                    textTransform: "none",
                                                }}
                                            >
                                            Continue
                                            </Button>
                                        </Grid>
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
 
export default ManageAccount;