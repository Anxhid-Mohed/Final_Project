import { Grid} from '@mui/material'
import SideBar from '@/components/user/SideBar/SideBar'
import Navbar from "@/components/user/NavBar/NavBar";
import { Container } from "@mui/system";
import HomePage from '@/components/user/HomePage/Home';


const Dashboard = () => {
    return (  
        <>
          <Navbar/>
            <Container>
                <Grid container sx={{display:'flex',mt:11}}>
                    <Grid md={2.5} sx={{display: { xs: 'none', sm: 'none', md: 'block'} }}>
                        <SideBar/>
                    </Grid>
                    <Grid xs={12} sm={12} md={9.5} sx={{lineBreak:'anywhere'}}>
                        <HomePage/>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
 
export default Dashboard;