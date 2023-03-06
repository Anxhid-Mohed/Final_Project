/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import React,{ useEffect, useRef } from "react";
import { uploadCoverImage, userFollow, userPages } from '@/Apis/userApi/userPageRequests'
import { Container, Grid, Box, Typography, Button, Stack, Divider, IconButton } from '@mui/material';
import { AiOutlineMessage ,AiOutlineCloudUpload} from 'react-icons/ai'
import About from "@/components/user/PageComponents/About";
import AddPosts from "@/components/user/PageComponents/AddPost";
import { storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Post from "@/components/user/PostPage/Post";
import { tokenVerification } from "@/Apis/userApi/userAuthRequest";
import { useRouter } from "next/router";
import { userDetails } from "@/redux/userSlice";
import { useDispatch ,useSelector} from "react-redux";
import Donate from "@/components/user/PageComponents/Donate";
import { notification } from "@/Apis/userApi/userRequests";
import { userNotification } from "@/redux/notificationSlice";
import { createChat } from "@/Apis/userApi/userChatRequests";

export const getServerSideProps = async (context:any) => {
    try {
        const username = context.params.username
        console.log(username,'page')
        const response = await userPages(username)
       
        
        return {
            props :{datas:response.data}
        }
    } catch (error) {
        console.log(error);
    }
}

const userPage = (datas:any) => {

    // console.log(datas,'---------------');
    
    const {user} = useSelector((state:any)=>state.userInfo)
    const dispatch = useDispatch()
    const router = useRouter()
    const coverImage:any = useRef()
    const [coverImg, setCoverImg] = React.useState<File[]>([]);
    const [about, setAbout] = React.useState(true);
    const [post, setPost] = React.useState(false);
    const [isFollowed, setIsFollowed] = React.useState(false)

    useEffect(()=>{
        setIsFollowed(user?.followings.some((el:any)=>el._id === datas?.datas?._id))
    },[user])
    

    useEffect(()=>{
        let token = localStorage.getItem('userToken')
        if(token){
           (
                async () => {

                    const response = await tokenVerification(token);
                    if(response?.status === false || response?.isBanned === true){
                        router.push('/auth')
                    }else if (response?.isAuthenticated){
                        dispatch(userDetails(response))
                    }
                }
            )()
        }else{
          router.push('/auth')
        }
    },[])
    
    useEffect(() => {
        
        if(coverImg.length>0){
            let token = localStorage.getItem('userToken');
            if(token){
                (
                    async()=> {
                        let dir = Date.now();
                        let random = Math.random();
                        const coverRef = ref(storage,'covers/'+dir+random+'/'+coverImg[0]?.name)
                        const toBase64 = (imgData:any) => 
                        new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(imgData);
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = error => reject(error);
                        }).catch((err) =>{
                            console.log(err)
                        })
                        const imgBase:any = await toBase64(coverImg[0]);
                        await uploadString(coverRef,imgBase,'data_url').then(async()=>{
                            const downloadURL = await getDownloadURL(coverRef)
                            const response = await uploadCoverImage(downloadURL,token as string)
                            if(response.status === true){

                                setCoverImg([])
                            }
                            
                        })
                    } 
                )()
            }
        }
    }, [coverImg])

    const handleFollow = async (createrId:string) => {
        let token = localStorage.getItem('userToken') as string
        let obj = {
            senderId:user?.userId,
            receiverId:datas?.datas?._id,
            content:`${user?.username} followed you `,
        }
        const response = await userFollow(createrId,token)
        if(response.action === 'followed'){
            setIsFollowed(true)
            const response = await notification(obj)
            dispatch(userNotification({"id":datas?.datas?._id,"message":`Hey ! ${user?.username} followed you `}))
        }else{
            setIsFollowed(false)
        }
    }

    const handleChat = async () => {
        try {
            const response = await createChat(user?.userId,datas?.datas._id)
            if(response?.status === true){
                router.push('/chat')
            }
        } catch (error) {
            
        }
    }
    

    const btnStyle = {fontSize:"1.4em" }
    const style = { color:'#303030', fontSize: "1.5rem" }
    
    return (
        <>
           <Container  maxWidth={false}  sx={{ maxWidth: '1000px'}}>
            <Grid xs={12} boxShadow={.5} sx={{
                backgroundImage:`url(${datas.datas.coverImage ? datas.datas.coverImage :''})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize:'cover',
                height: { xs:'90px' , sm:'150px' , md:'200px'},
                width:{ xs:'100%' , sm:'100%' , md:'100%'},
                borderRadius:'15px',
                textAlign: 'end',
            }}>     
                
            <Button 
             onClick = {()=>coverImage.current.click()}
             sx={{marginLeft:'auto',backgroundColor:'rgb(205 205 205 / 47%)',mt:1,mr:2,color:'#a9aaab'}}>
                <AiOutlineCloudUpload style={btnStyle}/>
            </Button>
            <input 
                type="file"
                name="profile"
                ref={coverImage}
                onChange={(e:any)=>setCoverImg(e.target.files)}
                hidden
            />
            </Grid>
            
            <Grid xs={12} sx={{display:'flex' , lineBreak:'anywhere' , minHeight:'10px'}}>
                <Grid xs={2} md={2} sx={{
                    pl: 1,
                    marginTop:'-20px'
                }}>
                    <img src={datas.datas.profile ? datas.datas.profile :'https://t4.ftcdn.net/jpg/01/16/67/99/360_F_116679941_wPDZXXs58H5SKL15YDeC2xoRaenOjGvV.jpg'} alt="" style={{  width:'35%' ,borderRadius:'50%'}} />
                    <Box sx={{marginTop:'5px' , display:{ xs:'block' , md:'none'}}}>
                        <Typography sx={{ fontWeight:'600' , fontSize:{ xs:'18px' , md:'24px'} }} >{datas?.datas.name}</Typography>
                        <Typography sx={{ fontSize:{ xs:'10px' , md:'17px'} }}><a href="">http://localhost:3000/pagevxvxcvxv</a></Typography>
                    </Box>
                </Grid>

                <Grid xs={5} md={6} sx={{ width:{md:'67%'} , ml:{ xs: -13 , sm: -10 , md: -16} }}>
                    <Box sx={{marginTop:'20px', display:{ xs:'none' , md:'block' }}}>
                        <Typography sx={{ fontWeight:'600' , fontSize:{ xs:'18px' , md:'24px'} }} >{datas?.datas.name}</Typography>
                        <Typography sx={{ fontSize:{ xs:'10px' , md:'17px'} }}><a href="">http://localhost:3000/{datas.datas.username}</a></Typography>
                    </Box>
                </Grid>

                <Grid xs={5} md={4} sx={{ marginTop:'2%',display:'flex' , ml:'auto' }}>

                    {user?.userId != datas?.datas._id && 
                        <>
                        { isFollowed?
                            <Box m={0.3}>
                                <Button  
                                onClick={()=>handleFollow(datas.datas._id)}
                                sx={{
                                    backgroundColor:'#f0eded',
                                    "&:hover": { backgroundColor: "#f0eded"},
                                    textTransform: 'none',
                                    borderRadius: 3,
                                    color:'#000',
                                    fontWeight:550,
                                    width:{md:'8.2rem'},
                                }}>Unfollow</Button>
                            </Box>:
                            <Box m={0.3}>
                                <Button  
                                onClick={()=>handleFollow(datas.datas._id)}
                                sx={{
                                    backgroundColor:'#eb1e44',
                                    "&:hover": { backgroundColor: "#eb1e44"},
                                    textTransform: 'none',
                                    borderRadius: 3,
                                    color:'white',
                                    fontSize:{sm:'15px'},
                                    width:{sm:'6.2rem',md:'8.2rem'},
                                }}>Follow</Button>
                            </Box>
                        }
                        </>
                    }
                    
                    <Box m={0.3}>
                        <Button 
                        onClick={handleChat}
                        sx={{
                            backgroundColor:'#f0eded',
                            "&:hover": { backgroundColor: "#f0eded"},
                            textTransform: 'none',
                            borderRadius: 4,
                        }}><AiOutlineMessage style={style} /></Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid xs={12} sx={{borderBottom: '2px solid #c9c8c7'}}>
                <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    my={3}
                    ml={3}
                    >
                    <Typography onClick={()=>{
                        setPost(false)
                        setAbout(true);
                    }}><a>About</a></Typography>

                    <Typography onClick={()=>{
                        setAbout(false);
                        setPost(true)
                    }}><a>Posts</a></Typography>
                </Stack>
            </Grid>

            {about &&<Grid mt={3} sx={{display:{md:'flex',sm:'flex'}}}>
                <Grid xs={12} sm={12} md={6} m={1} sx={{ width:{ xs:'100%' , sm:'100%' , md:'50%' } }} >
                    <About data={datas?.datas}/>
                </Grid>
                <Grid xs={12} sm={12} md={6} m={1} sx={{ width:{ xs:'100%' , sm:'100%' , md:'50%' } }} >
                    {datas?.datas._id === user?.userId && user?.creator === true ? <AddPosts data={datas?.datas.profile}/>:''}
                    {datas?.datas._id != user?.userId && datas?.datas.creator === true && <Donate data={datas?.datas._id}/>}
                </Grid>
            </Grid>}

            {post && <Post username={datas?.datas.username} profile={datas?.datas.profile}/>}

            
        </Container>
        </>

    );
}
 
export default userPage;

