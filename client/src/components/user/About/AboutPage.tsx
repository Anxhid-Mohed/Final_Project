import { Grid } from "@mui/material";
import About from "../PageComponents/About";
import AddPosts from "../PageComponents/AddPost";

const AboutPage = () => {
    return (  
        <Grid mt={3} sx={{display:{md:'flex',sm:'flex'}}}>
            <Grid xs={12} sm={12} md={6} m={1} sx={{ width:{ xs:'100%' , sm:'100%' , md:'50%' } }} >
                <About/>
            </Grid>
            <Grid xs={12} sm={12} md={6} m={1} sx={{ width:{ xs:'100%' , sm:'100%' , md:'50%' } }} >
                <AddPosts/>
            </Grid>
        </Grid>
    );
}
 
export default AboutPage;