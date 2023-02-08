import * as React from 'react';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Button, IconButton, styled } from '@mui/material';
import { useState } from "react";
import { requestApproval, requestRejection } from '@/Apis/adminApi/AdminListing';
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

const RequestRows = (request:any) => {

    return (  
        <>
            <StyledTableRow key={ request.request._id}>
                <StyledTableCell sx={{display:'flex',alignItems: 'center'}} component="th" scope="row" tabIndex={-1} key={request._id}>
                    <Avatar sx={{marginRight:'5px'}} alt="Remy Sharp" src={request ? request.request.profile :'user'} />
                    {request.request.userId?.name}
                </StyledTableCell>
                <StyledTableCell align="left">{request.request.categories}</StyledTableCell>
                <StyledTableCell align="left">{moment(request.createdAt).format("Do MMMM, YYYY")}</StyledTableCell>
                <StyledTableCell  align="right">
                    <Button 
                    onClick={()=>{
                        Swal.fire({
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#6aba4d',
                            cancelButtonColor: '#e8e8e8',
                            confirmButtonText: 'Yes, approve it!'
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                const response = await requestApproval(request.request._id)
                                console.log(response)
                                if (response.status === true) {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Approval Success',
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

                    }}
                    sx={{
                        backgroundColor:'#6aba4d',
                        borderRadius:'9px' ,
                        boxShadow:3 , 
                        color:'#fff' , 
                        fontSize:'10px' , 
                        fontWeight:'800' ,
                        mr:{md:3,sm:3},
                        ":hover":{ backgroundColor:'#6aba4d'}}}
                    >
                        Approve
                    </Button>
                    <IconButton
                    onClick={()=>{
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
                                const response = await requestRejection(request.request._id)
                                console.log(response)
                                if (response.status === true) {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Request rejected',
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
                    }}
                        aria-label="close"
                        color="inherit"
                        size="small"
                        >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                </StyledTableCell>
            </StyledTableRow>
        </>
    );
}
 
export default RequestRows;