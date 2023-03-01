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
import NavBar from "@/components/admin/NavBar/NavBar";
import moment from 'moment';
import { Container, Grid, styled } from '@mui/material';
import { userBlocked, usersList } from '@/Apis/adminApi/AdminListing';
import Row from '@/components/admin/RowComponent/UsersRow';

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


export const getServerSideProps = async() => {
  try {
    const response = await usersList();
    return {
      props : {users:response.data}
    }
  } catch (error) {
    console.log(error);
  } 
}

export default function UsersTable(users:any) {
  
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
    <>
      <NavBar/>
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
                                    <Row key={user._id} user={user}/>
                                  );
                              })}
                          </TableBody>
                      </Table>
                  </TableContainer>
                  <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={users.users.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                  />
              </Paper>
          </Grid>
        </Grid>
    </Container>
    </>
  );
}
