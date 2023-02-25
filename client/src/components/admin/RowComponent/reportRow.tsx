import * as React from 'react';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Avatar, Button, styled } from '@mui/material';
import { useRouter } from 'next/router';
import { removeReportedPost } from '@/Apis/adminApi/AdminListing';
import Swal from 'sweetalert2';

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


const ReportRow = ({report}: any) => {
    
    const router = useRouter();
    
    const handleDeletePost = async () => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#e8e8e8',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const postId = report.postId._id
                    const response = await removeReportedPost(postId)
                    if(response.status === true){
                        router.replace(router.asPath)
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: response.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }else{
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: response.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }

            })
            

        } catch (error){
            console.log(error)
        }
    }
    
    return (
        <>
        
            <StyledTableRow >
                <StyledTableCell
                    sx={{ display: "flex", alignItems: "center" }}
                    component="th"
                    scope="row"
                    tabIndex={-1}
                    key={report._id}
                >
                    <Avatar
                    sx={{ marginRight: "5px" }}
                    alt="Remy Sharp"
                    src={report ? report?.userId.profile :''}
                    />
                    
                </StyledTableCell>
                <StyledTableCell align="left">{report ? report.reason :''}</StyledTableCell>
                <StyledTableCell align="left">
                    <Button
                        onClick={()=>router.push(`/admin/report/${report.postId._id}`)}
                        sx={{
                            backgroundColor: "grey",
                            borderRadius: "9px",
                            boxShadow: 3,
                            color: "#fff",
                            fontSize: "10px",
                            fontWeight: "800",
                            ":hover": { backgroundColor: "#f04f4f" },
                        }}
                    >
                        view
                    </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                    <Button
                        onClick={handleDeletePost}
                        sx={{
                            backgroundColor: "#f04f4f",
                            borderRadius: "9px",
                            boxShadow: 3,
                            color: "#fff",
                            fontSize: "10px",
                            fontWeight: "800",
                            ":hover": { backgroundColor: "#f04f4f" },
                        }}
                    >
                        remove
                    </Button>
                </StyledTableCell>
            </StyledTableRow>
        </>
    );
};

export default ReportRow;
