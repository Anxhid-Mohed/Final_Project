import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SideBar from '@/components/admin/SideBar/SideBar';
import moment from 'moment';
import { Avatar, Box, Button, Container, Grid, styled } from '@mui/material';
import { usersList } from '@/Apis/adminApi/AdminListing';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
    border: 0,
    },
}));

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export const getStaticProps = async(context:any) => {
  try {
    const response = await usersList();
    // console.log('suiiiiiiiiiiiiiiiiiii',response.data);
    return {
      props : {users:response.data}
    }
  } catch (error) {
    
  }
  // const res = await 
}

export default function UsersTable(users:any) {
  console.log(users.users);
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
   <Container>
        <Grid container sx={{display:'flex',pt:11}}>
            <Grid md={2.5} sx={{display: { xs: 'none', sm: 'none', md: 'block'} }}>
                <SideBar/>
            </Grid>
            <Grid xs={12} sm={12} md={9.5} sx={{lineBreak:'auto'}}>   
              <Paper sx={{ width: '100%',marginLeft:{md:'25px'}}}>
                  <TableContainer sx={{ maxHeight: 560 }}>
                      <Table stickyHeader aria-label="sticky table">
                          <TableHead style={{borderRadius:'10px'}}>
                              <TableRow>
                                  <StyledTableCell sx={{ borderTopLeftRadius: '12px' , borderBottomLeftRadius: '12px'}}>User Name</StyledTableCell>
                                  <StyledTableCell align="left">Email</StyledTableCell>
                                  <StyledTableCell align="left">Joined</StyledTableCell>
                                  <StyledTableCell sx={{ borderBottomRightRadius: '12px' , borderTopRightRadius: '12px'}} align="center">Actions</StyledTableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {users.users
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((user:any) => {
                                  return (
                                  <StyledTableRow key={user._id}>
                                     
                                      <StyledTableCell sx={{display:'flex',alignItems: 'center'}} component="th" scope="row" tabIndex={-1} key={user._id}>
                                      <Avatar sx={{marginRight:'5px'}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        {user.name}
                                      </StyledTableCell>
                                      <StyledTableCell align="left">{user.email}</StyledTableCell>
                                      <StyledTableCell align="left">{moment(user.createdAt).format("Do MMMM, YYYY")}</StyledTableCell>
                                      <StyledTableCell align="center">
                                          <Button sx={{ 
                                             backgroundColor:'#f04f4f',
                                             borderRadius:'9px' ,
                                             boxShadow:3 , 
                                             color:'#fff' , 
                                             fontSize:'10px' , 
                                             fontWeight:'800' ,
                                              ":hover":{ backgroundColor:'#f04f4f'}}}>
                                              block
                                          </Button>
                                      </StyledTableCell>
                                  </StyledTableRow>
                                  );
                              })}
                          </TableBody>
                      </Table>
                  </TableContainer>
                  <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                  />
              </Paper>
          </Grid>
        </Grid>
    </Container>
  );
}
