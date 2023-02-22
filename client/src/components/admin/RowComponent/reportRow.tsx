import * as React from 'react';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Avatar, Button, styled } from '@mui/material';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     '&:last-child td, &:last-child th': {
//     border: 0,
//     },
// }));

// const ReportRow = (report: any) => {
    
//     return (
//         <StyledTableRow >
//             <StyledTableCell
//                 sx={{ display: "flex", alignItems: "center" }}
//                 component="th"
//                 scope="row"
//                 tabIndex={-1}
//                 key={report._id}
//             >
//                 <Avatar
//                 sx={{ marginRight: "5px" }}
//                 alt="Remy Sharp"
//                 src="/static/images/avatar/1.jpg"
//                 />
//                 {report ? report?.userId.profile :''}
//             </StyledTableCell>
//             <StyledTableCell align="left">{report ? report.reason :''}</StyledTableCell>
//             <StyledTableCell align="left">
//                 <Button
//                     sx={{
//                         backgroundColor: "grey",
//                         borderRadius: "9px",
//                         boxShadow: 3,
//                         color: "#fff",
//                         fontSize: "10px",
//                         fontWeight: "800",
//                         ":hover": { backgroundColor: "#f04f4f" },
//                     }}
//                 >
//                     view
//                 </Button>
//             </StyledTableCell>
//             <StyledTableCell align="center">
//                 <Button
//                     sx={{
//                         backgroundColor: "#f04f4f",
//                         borderRadius: "9px",
//                         boxShadow: 3,
//                         color: "#fff",
//                         fontSize: "10px",
//                         fontWeight: "800",
//                         ":hover": { backgroundColor: "#f04f4f" },
//                     }}
//                 >
//                     remove
//                 </Button>
                
//             </StyledTableCell>
//         </StyledTableRow>
//     );
// };

// export default ReportRow;
