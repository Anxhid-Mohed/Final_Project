import Requests from "@/components/admin/Requests/Requests";
import SideBar from "@/components/admin/SideBar/SideBar";
import { Container, Grid } from "@mui/material";

const Dashboard = () => {
    return (  
        <Container>
            <Grid container sx={{display:'flex',mt:11}}>
                <Grid md={2.5} sx={{display: { xs: 'none', sm: 'none', md: 'block'} }}>
                    <SideBar/>
                </Grid>
                <Grid xs={12} sm={12} md={9.5} sx={{lineBreak:'anywhere'}}>
                    <h3>hellooo</h3>
                    <Requests/>
                </Grid>
            </Grid>
        </Container>
    );
}
 
export default Dashboard;