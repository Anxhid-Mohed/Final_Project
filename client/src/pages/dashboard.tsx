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
                <HomePage/>
            </Container>
        </>
    );
}
 
export default Dashboard;