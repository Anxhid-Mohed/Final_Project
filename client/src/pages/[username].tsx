/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import React,{ useEffect, useRef } from "react";
import { uploadCoverImage, userPages } from '@/Apis/userApi/userPageRequests'
import { Container, Grid, Box, Typography, Button, Stack, Divider, IconButton } from '@mui/material';
import { AiOutlineMessage ,AiOutlineCloudUpload} from 'react-icons/ai'
import About from "@/components/user/PageComponents/About";
import AddPosts from "@/components/user/PageComponents/AddPost";
import { storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadString } from "firebase/storage";




export const getServerSideProps = async (context:any) => {
    try {
        const username = context.params.username
        const response = await userPages(username)
        return {
            props :{datas:response.data}
        }
    } catch (error) {
        console.log(error);
    }
}

const userPage = (datas:any) => {

    const coverImage:any = useRef()
    const [coverImg, setCoverImg] = React.useState<File[]>([]);

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
                            if(response.status === true)setCoverImg([])
                        })
                    } 
                )()
            }
        }
    }, [coverImg])
    

    const btnStyle = {fontSize: "1.4em" }
    const style = { color:'#303030', fontSize: "1.8em" }
    return (
        <>
           <Container  maxWidth={false}  sx={{ maxWidth: '1000px'}}>
            <Grid xs={12} boxShadow={.5} sx={{
                backgroundImage:`url(${datas ? datas.datas.coverImage :''})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize:'cover',
                height: { xs:'90px' , sm:'150px' , md:'200px'},
                width:{ xs:'100%' , sm:'100%' , md:'100%'},
                borderRadius:'15px',
                textAlign: 'end',
            }}>     
                
            <IconButton 
             onClick = {()=>coverImage.current.click()}
             sx={{marginLeft:'auto'}}>
                <AiOutlineCloudUpload style={btnStyle}/>
            </IconButton>
            <input 
                type="file"
                name="profile"
                ref={coverImage}
                onChange={(e:any)=>setCoverImg(e.target.files)}
                hidden
            />
                {/* //Cover-image */}
            </Grid>
            
            <Grid xs={12} sx={{display:'flex' , lineBreak:'anywhere' , minHeight:'10px'}}>
                <Grid xs={2} md={2} sx={{
                    pl: 1,
                    marginTop:'-20px'
                }}>
                    <img src={datas ? datas.datas.profile :'https://t4.ftcdn.net/jpg/01/16/67/99/360_F_116679941_wPDZXXs58H5SKL15YDeC2xoRaenOjGvV.jpg'} alt="" style={{  width:'35%' ,borderRadius:'50%'}} />
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

                    <Box m={0.3}>
                        <Button  sx={{
                            backgroundColor:'#eb1e44',
                            "&:hover": { backgroundColor: "#eb1e44"},
                            textTransform: 'none',
                            borderRadius: 3,
                            color:'white',
                            width:{md:'8.2rem'},
                        }}>Follow</Button>
                    </Box>
                    
                    <Box m={0.3}>
                        <Button sx={{
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
                    <Typography><a>About</a></Typography>
                    <Typography><a>Posts</a></Typography>
                </Stack>
            </Grid>

            <Grid mt={3} sx={{display:{md:'flex',sm:'flex'}}}>
                <Grid xs={12} sm={12} md={6} m={1} sx={{ width:{ xs:'100%' , sm:'100%' , md:'50%' } }} >
                    <About data={datas?.datas}/>
                </Grid>
                <Grid xs={12} sm={12} md={6} m={1} sx={{ width:{ xs:'100%' , sm:'100%' , md:'50%' } }} >
                    <AddPosts data={datas?.datas}/>
                </Grid>
            </Grid>

            
        </Container>
        </>

    );
}
 
export default userPage;

function resolve(result: string | ArrayBuffer | null): any {
    throw new Error("Function not implemented.");
}


function reject(error: ProgressEvent<FileReader>): any {
    throw new Error("Function not implemented.");
}
