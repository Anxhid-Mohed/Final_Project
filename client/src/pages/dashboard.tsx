import { Grid} from '@mui/material'
import SideBar from '@/components/user/SideBar/SideBar'
import Navbar from "@/components/user/NavBar/NavBar";
import { Container } from "@mui/system";


const Dashboard = () => {
    return (  
        <>
          <Navbar/>
          <Container>
            <Grid container sx={{display:'flex',mt:11}}>
                <Grid xs={2.5} sm={2.5} md={2.5}>
                    <SideBar/>
                </Grid>
                <Grid xs={9.5} sm={9.5} md={9.5} sx={{lineBreak:'anywhere'}}>
                    <h1 className='text-white'>SecondBar</h1>
                </Grid>
            </Grid>
          </Container>

          

        </>
    );
}
 
export default Dashboard;