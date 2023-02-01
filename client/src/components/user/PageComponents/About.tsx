import { Box, Typography } from "@mui/material";

const About = () => {
    return (  
       <Box boxShadow={2} sx={{
        borderRadius:'20px',
        py:'5px'
         }}>
            <Box p={2} sx={{color:'#333232'}}>
                <h4 style={{marginTop:'4px'}}>Support Anshy</h4><br/>
                <Typography><a style={{marginTop:'3px'}}>Hy i just started a page here , you can support me now goooysbjhbdcjhbdschjbhds jbschjwdbjchbwejhcbew jebdjhwbdehjdbjhwbde</a></Typography>
            </Box>
       </Box>
    );
}
 
export default About;