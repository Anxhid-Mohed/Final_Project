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
import IconButton from '@mui/material/IconButton';
import moment from 'moment';
import { Avatar, Box, Button, Container, Grid, styled } from '@mui/material';
import RequestRows from '@/components/admin/RowComponent/RequestRow';
import { useEffect } from 'react';
import { reportLists } from '@/Apis/adminApi/AdminListing';
// import ReportRow from '@/components/admin/RowComponent/reportRow';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
//   }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     '&:last-child td, &:last-child th': {
//     border: 0,
//     },
// }));



// export default function Requests() {

//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);
//     const [reports, setReports] = React.useState<any[]>()
//     console.log(reports,'-------')

//     useEffect(()=>{
//         (
//             async()=>{
//                 const response = await reportLists()
//                 if(response?.status === true){
//                     console.log(response.data)
//                     setReports(response?.data)
//                 }
//             }
//         )()
//     },[])
  
//     const handleChangePage = (event: unknown, newPage: number) => {
//       setPage(newPage);
//     };
  
//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//       setRowsPerPage(+event.target.value);
//       setPage(0);
//     };

//     return (  
//       <Container>
//         <Grid container item sx={{display:'flex',pt:11}}>
//                 <Grid item md={2.5} sx={{display: { xs: 'none', sm: 'none', md: 'block'} }}>
//                     <SideBar/>
//                 </Grid>
//             <Grid item xs={12} sm={12} md={9.5} sx={{lineBreak:'auto'}}>   
//                 <Paper sx={{ width: '100%',marginLeft:{md:'25px'}}}>
//                     <TableContainer sx={{ maxHeight: 560 }}>
//                         <Table stickyHeader aria-label="sticky table">
//                             <TableHead style={{borderRadius:'10px'}}>
//                                 <TableRow>
//                                     <StyledTableCell sx={{ borderTopLeftRadius: '12px' , borderBottomLeftRadius: '12px'}}>reporter</StyledTableCell>
//                                     <StyledTableCell align="left">reasons</StyledTableCell>
//                                     <StyledTableCell align="left">Posts</StyledTableCell>
//                                     <StyledTableCell sx={{ borderBottomRightRadius: '12px' , borderTopRightRadius: '12px'}} align="center">Actions</StyledTableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                             {reports
//                                 // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                 .map((report:any) => {
//                                     return (
//                                      <ReportRow key={report._id} report={report}/>
//                                     )
//                                 }) 
//                             }  
//                             </TableBody>
//                       </Table>
//                   </TableContainer>
//                   {/* <TablePagination
//                       rowsPerPageOptions={[10, 25, 100]}
//                       component="div"
//                       count={reports.length}
//                       rowsPerPage={rowsPerPage}
//                       page={page}
//                       onPageChange={handleChangePage}
//                       onRowsPerPageChange={handleChangeRowsPerPage}
//                     /> */}
//                 </Paper>
//             </Grid>
//         </Grid>
//      </Container>
//     );
// }