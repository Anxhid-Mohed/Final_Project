import * as React from 'react';
import { userBlocked, userUnBlocked } from "@/Apis/adminApi/AdminListing";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { Avatar, Button, styled } from '@mui/material';
import { useState } from "react";

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

const Row = (user: any) => {
    const [userBanned, setUserBanned] = useState(user.user.isBanned)
    console.log(user)

    return (
        <StyledTableRow key={user._id}>
            <StyledTableCell
                sx={{ display: "flex", alignItems: "center" }}
                component="th"
                scope="row"
                tabIndex={-1}
                key={user._id}
            >
                <Avatar
                sx={{ marginRight: "5px" }}
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                />
                {user.user.name}
            </StyledTableCell>
            <StyledTableCell align="left">{user.user.email}</StyledTableCell>
            <StyledTableCell align="left">
              {moment(user.createdAt).format("Do MMMM, YYYY")}
            </StyledTableCell>
            <StyledTableCell align="center">
                {userBanned ? (
                <Button
                    onClick={async () => {
                        const response = await userUnBlocked(user.user._id);
                        console.log(response)
                        setUserBanned(!userBanned)
                    }}
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
                    Unblock
                </Button>
                ) : (
                <Button
                    onClick={async () => {
                        const response = await userBlocked(user.user._id);
                        console.log(response)
                        setUserBanned(!userBanned)
                    }}
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
                    block
                </Button>
                )}
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default Row;
