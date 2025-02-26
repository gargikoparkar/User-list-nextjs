"use client";
import { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, TablePagination, Box,
  Container
} from "@mui/material";
import UserFormDialog from "./UserForm";
import { initialUsers } from "../lib/data";
import { User } from "../lib/type";


const UsersTable = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleAddUser = () => {
    setEditingUser(null);
    setDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  const handleSaveUser = (user: User) => {
    setUsers((prevUsers) =>
      user.id
        ? prevUsers.map((u) => (u.id === user.id ? user : u))
        : [...prevUsers, { ...user, id: prevUsers.length + 1 }]
    );
    setDialogOpen(false);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Add New User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell align="center">{user.first_name}</TableCell>
                <TableCell align="center">{user.last_name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" onClick={() => handleEditUser(user)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={users.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <UserFormDialog user={editingUser} onSave={handleSaveUser} onCancel={() => setDialogOpen(false)} />
      </Dialog>
    </Container>
  );
}

export default UsersTable;
