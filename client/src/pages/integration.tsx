/* eslint-disable react-hooks/rules-of-hooks */
import { tokenVerification } from "@/Apis/userApi/userAuthRequest";
import { editBankInfos, getBankInfo, integrateAcc } from "@/Apis/userApi/userManagement";
import Navbar from "@/components/user/NavBar/NavBar";
import SideBar from "@/components/user/SideBar/SideBar";
import { userDetails } from "@/redux/userSlice";
import { Box, Button, Container, Fade, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

export const setErrMsg = (msg: string) =>{
    toast.error(msg, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    return;
}

export const setSuccessMsg = (msg: string) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    return;
}

const ModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:{xs:350,sm:450,md:450},
    bgcolor: 'background.paper',
    borderRadius:'12px',
    outline: 'none',
    boxShadow: 24,
    p: 4,
};

const Integrations = () => {

    const {user} = useSelector((state:any)=>state.userInfo)
    const dispatch = useDispatch()
    const router = useRouter();
    const [open , setOpen] = React.useState(false)
    const [openEdit, setOpenEdit] = React.useState(false)
    const [name, setName] = React.useState(false);
    const [nameErr, setNameErr] = React.useState('')
    const [acc, setAcc] = React.useState(false);
    const [accErr, setAccErr] = React.useState('')
    const [ifsc, setIfsc] = React.useState(false);
    const [ifscErr, setIfscErr] = React.useState('')
    const [required, setRequired] = React.useState('')
    const [data, useData] = React.useState<{Fullname: string;AccountNumber:number;IFSC:string,Branch:string,TransactionId:string}>()
    const [integated,setIntegrated] = React.useState(false)

    useEffect(()=>{
        let token = localStorage.getItem('userToken')
        if(token){
           (
                async () => {

                    const response = await tokenVerification(token);
                    
                    if(response?.status === false || response?.isBanned === true){
                        router.push('/auth')
                    }else if (response?.isAuthenticated  && response?.isBanned === false){
                        dispatch(userDetails(response))
                        
                    }
                }
            )()
        }else{
          router.push('/auth')
        }
    },[]);

    useEffect(()=>{
        let token = localStorage.getItem('userToken')

        if(token){
        (
            async () => {
                const response = await getBankInfo(token)
                console.log(response.data)
                if(response.status === true){
                    useData(response.data)
                }else{
                    useData(response.data)
                }
            }
        )()
        }
    },[integated])
  

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>,isVerified:Boolean) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let infos = {
            name:data.get('name'),
            accountNo:data.get('AccountNumber'),
            Ifsc:data.get('ifsc'),
            branch:data.get('branch'),
            transactionId:data.get('transactionId')
        }
        const {name,accountNo,Ifsc,branch} = infos;
        let token = localStorage.getItem('userToken') as string;
        if(name && accountNo && Ifsc && branch){
            setRequired('')
            let regName = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
            if(regName.test(name.toString())){
                setName(false);
                setNameErr('')
                if(accountNo.length  >= 8 && accountNo.length <= 18 ){
                    setAcc(false);
                    setAccErr('');
                    let regIfsc = /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/;
                    if(regIfsc.test(Ifsc.toString())){
                        setIfsc(false);
                        setIfscErr('')
                        if(isVerified){
                            console.log('ooombi')
                            const response = await integrateAcc(infos,token)
                            if(response?.status === true){
                                setSuccessMsg(response?.message)
                                setOpen(false)
                                setIntegrated(!integated)
                            }else{
                                setErrMsg(response?.message)
                                setOpen(false)
                            }
                        }else{
                            console.log('set')
                            const response = await editBankInfos(infos,token)
                            if(response?.status === true){
                                setSuccessMsg(response?.message)
                                setOpenEdit(false)
                                setIntegrated(!integated)
                            }else{
                                setErrMsg(response?.message)
                                setOpenEdit(false)
                            }   
                        }  
                    }else{
                        setIfsc(true);
                        setIfscErr('Enter a valid Ifsc code')
                    }        
                }else{
                    setAcc(true);
                    setAccErr('Enter a valid account number')  
                }
            }else{
                setName(true);
                setNameErr('Never contains special characters');
            }
        }else{
            setRequired('All fields are required')
        }
    }

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
                        <Container maxWidth='lg'>
                            <Grid item xs={12} sx={{width:'100%'}}>
                                <h3 style={{marginTop:'14px',fontWeight:'800'}}>Integrate Bank Account</h3>
                                {data === null ? <Grid item mt={3} mb={2} xs={12}  p={3.5}  sx={{borderRadius:'12px',border:'1px solid rgba(238,82,82,.5)',lineBreak:'auto',backgroundColor:'#fef6f6'}}>
                                    <Grid item xs={12}>
                                        <h3>Add Bank Details</h3>
                                    </Grid>
                                    <Box mt={2} sx={{display:{xs:'block' ,sm:'flex' ,md:'flex'}}}>
                                        <Grid item xs={12} sm={9} md={9} sx={{width:'100%'}}>
                                            <Typography sx={{lineBreak:'auto',color:'#717171',fontSize:'16px'}} letterSpacing={1}>
                                                If you want to accept your donations then you will need to integrate your bank account details here.
                                                You can only add one bank account details for accepting your donations.Get paid to your local bank account automatically
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3} md={3} sx={{width:'100%',textAlign:{xs:'-moz-initial',sm:'end',md:'end'}}}>
                                       
                                        <Button  
                                            onClick={()=>setOpen(true)}
                                            sx={{
                                                backgroundColor:'#ee5252',
                                                "&:hover": { backgroundColor: "#ee5252"},
                                                textTransform: 'none',
                                                borderRadius: 3,
                                                fontWeight:'bold',
                                                color:'#fff',
                                                width:{sm:'8.1rem',md:'8.2rem'},
                                            }}
                                        >
                                            Integrate
                                        </Button> 
                                        </Grid>
                                    </Box>
                                    <Modal
                                        open={open}
                                        onClose={()=>{setOpen(false);setRequired('')}}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Fade in={open}>
                                            <Box sx={ModalStyle}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2" align="center" letterSpacing={1}>
                                                    Add Details
                                                </Typography>
                                                <Box mt={2}>
                                                    <Box sx={{ pb: 1}} 
                                                     component="form"
                                                     noValidate
                                                     onSubmit={(e)=>handleSubmit(e,true)}
                                                    >
                                                        <Grid item xs={12}>
                                                            {required && <Typography mb={0.5} sx={{color:'red',fontFamily:'sans-serif'}} align='center'>{required}</Typography>} 
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                name="name"
                                                                label="FullName"
                                                                type="text"
                                                                id="name"
                                                                multiline
                                                                autoComplete="new-name"
                                                                error={name}
                                                                helperText={nameErr}
                                                                sx={{
                                                                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},
                                                                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#f22c50"}},
                                                                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} mt={2}>
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                name="AccountNumber"
                                                                label="Account Number"
                                                                type="number"
                                                                id="Account Number"
                                                                multiline
                                                                autoComplete="new-name"
                                                                error={acc}
                                                                helperText={accErr}
                                                                sx={{
                                                                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},
                                                                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#f22c50"}},
                                                                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} mt={2}>
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                name="ifsc"
                                                                label="IFSC Code"
                                                                type="text"
                                                                id="ifsc-code"
                                                                multiline
                                                                autoComplete="new-name"
                                                                error={ifsc}
                                                                helperText={ifscErr}
                                                                sx={{
                                                                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},
                                                                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#f22c50"}},
                                                                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} mt={2}>
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                name="branch"
                                                                label="Branch Name"
                                                                type="text"
                                                                id="branch-name"
                                                                multiline
                                                                autoComplete="new-name"
                                                                sx={{
                                                                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},
                                                                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#f22c50"}},
                                                                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} mt={2}>
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                name="transactionId"
                                                                label="UPI/Other"
                                                                type="text"
                                                                id="transactionId"
                                                                multiline
                                                                autoComplete="transactionId"
                                                                sx={{
                                                                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},
                                                                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#f22c50"}},
                                                                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Button
                                                            fullWidth
                                                            type="submit"
                                                            variant="contained"
                                                            sx={{
                                                                mt: 1,
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

                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Fade>
                                    </Modal>
                                </Grid>:
                                <Grid item mt={3} mb={2} xs={12}  p={3.5}  sx={{borderRadius:'12px',border:'1px solid rgb(146 129 129 / 50%)',lineBreak:'auto',backgroundColor:'#ebe6e699'}}>
                                    <Grid item xs={12} sx={{display:'flex',justifyContent:'space-between'}}>
                                        <h3>Bank Details</h3>
                                        <IconButton onClick={()=>setOpenEdit(true)}>
                                            <CreateOutlinedIcon/>
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={12} sm={9} md={9} sx={{width:'100%'}}>
                                        <Typography sx={{lineBreak:'auto',color:'#717171',fontSize:{xs:'14px',sm:'14px',md:'16px'}}} letterSpacing={1}>
                                        {data?.Fullname} <br /> {data?.AccountNumber} <br /> {data?.IFSC} <br /> {data?.Branch}<br /> {data?.TransactionId}
                                        </Typography>
                                    </Grid>
                                    <Modal
                                        open={openEdit}
                                        onClose={()=>{setOpenEdit(false);setRequired('')}}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Fade in={openEdit}>
                                            <Box sx={ModalStyle}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2" align="center" letterSpacing={1}>
                                                    Add Details
                                                </Typography>
                                                <Box mt={2}>
                                                    <Box sx={{ pb: 1}} 
                                                     component="form"
                                                     noValidate
                                                     onSubmit={(e)=>handleSubmit(e,false)}
                                                    >
                                                        <Grid item xs={12}>
                                                            {required && <Typography mb={0.5} sx={{color:'red',fontFamily:'sans-serif'}} align='center'>{required}</Typography>} 
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                name="name"
                                                                label="FullName"
                                                                type="text"
                                                                id="name"
                                                                defaultValue={data?.Fullname}
                                                                multiline
                                                                autoComplete="new-name"
                                                                error={name}
                                                                helperText={nameErr}
                                                                sx={{
                                                                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},
                                                                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#f22c50"}},
                                                                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} mt={2}>
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                name="AccountNumber"
                                                                label="Account Number"
                                                                type="number"
                                                                id="Account Number"
                                                                defaultValue={data?.AccountNumber}
                                                                multiline
                                                                autoComplete="new-name"
                                                                error={acc}
                                                                helperText={accErr}
                                                                sx={{
                                                                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},
                                                                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#f22c50"}},
                                                                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} mt={2}>
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                name="ifsc"
                                                                label="IFSC Code"
                                                                type="text"
                                                                id="ifsc-code"
                                                                defaultValue={data?.IFSC}
                                                                multiline
                                                                autoComplete="new-name"
                                                                error={ifsc}
                                                                helperText={ifscErr}
                                                                sx={{
                                                                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},
                                                                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#f22c50"}},
                                                                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} mt={2}>
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                name="branch"
                                                                label="Branch Name"
                                                                type="text"
                                                                id="branch-name"
                                                                defaultValue={data?.Branch}
                                                                multiline
                                                                autoComplete="new-name"
                                                                sx={{
                                                                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},
                                                                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#f22c50"}},
                                                                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} mt={2}>
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                name="transactionId"
                                                                label="UPI/Other"
                                                                type="text"
                                                                id="transactionId"
                                                                defaultValue={data?.TransactionId}
                                                                multiline
                                                                autoComplete="transactionId"
                                                                sx={{
                                                                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},
                                                                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#f22c50"}},
                                                                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Button
                                                            fullWidth
                                                            type="submit"
                                                            variant="contained"
                                                            sx={{
                                                                mt: 1,
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

                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Fade>
                                    </Modal>
                                </Grid>
                                }   
                                
                            </Grid>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
 
export default Integrations;