import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import {FcLikePlaceholder} from 'react-icons/fc'
import {BiDollar} from 'react-icons/bi'
import {MdMultipleStop} from 'react-icons/md'
import PayPal from "../PayPal/Paypal";


const Donate = ({data}:{data:string}) => {
    const [count,setCount] = React.useState<number>(0)
    const [note , setNote] = React.useState('')
    const [donate,setDonate] = React.useState(false)
    
    return (  
        <>
            <Box boxShadow={1} sx={{
                border:'1px solid #dedede',
                borderRadius:'12px',
                p:3
                }}>
                <Box  sx={{
                    textAlign:'center',
                }}>
                    <h4 style={{marginTop:'4px'}}>Give a Tip for sahad</h4>
                </Box>    
                <Box
                    sx={{
                        display:'flex',
                        justifyContent:'space-between',
                        alignItems:'center',
                        mt:2
                    }}
                >

                    <Box sx={{display:'flex',alignItems:'center'}}>
                        <FcLikePlaceholder style={{fontSize:'35px'}}/>
                        <Typography sx={{color:'#717171',fontSize:'16px', ml:1}} letterSpacing={1}>
                            $3 Each
                        </Typography>
                    </Box>
                    <Box sx={{textAlign:'center'}}>
                        
                    </Box>
                    <Box sx={{display:'flex',marginLeft:'auto',width:'70px'}}>
                        {!donate && 
                            <TextField
                                id="outlined-number"
                                type="number"
                                onChange={(e)=>setCount(parseInt(e.target.value))}
                                InputProps={{
                                    inputProps: { min: 1 }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onKeyPress={(event) => {
                                    if (event?.key === '-' || event?.key === '+') {
                                    event.preventDefault();
                                    }
                                }}
                                sx={{marginLeft:'auto',
                                    "& .MuiInputLabel-root.Mui-focused": { color: "#4f4e4e" },
                                    "& .MuiOutlinedInput-root.Mui-focused": {
                                    "& > fieldset": { borderColor: "#f22c50" },
                                    },
                                    "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderRadius: 3 },
                                    },
                                }}
                            />
                        }
                    </Box>
                </Box>
                <Box mt={2}>
                    <TextField
                        required
                        fullWidth
                        name="note"
                        type="text"
                        id="note"
                        value={note}
                        onChange={(e)=>setNote(e.target.value)}
                        autoComplete="note"
                        placeholder="Say something nice :)"
                        multiline
                        rows={2}
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
                </Box>
                <Box mt={2}>
                    {donate ? (
                        <PayPal donation={count} setDonate={setDonate} creatorId={data}/>
                    ):(<Button
                        onClick={()=>{
                            {count != undefined && count > 0 ? setDonate(true): setDonate(false)}
                        }}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mb: 2,
                            borderRadius: "20px",
                            height: "42px",
                            backgroundColor: "#eb1e44",
                            "&:hover": { backgroundColor: "#eb1e44" },
                            textTransform: "none",
                        }}
                        >
                        <BiDollar/>    
                        {count ? count  * 3:null} Donate
                    </Button>)}
                </Box>     
            </Box>
        </>
    );
}
 
export default Donate;