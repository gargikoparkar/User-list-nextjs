"use client";
import { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Dialog, TablePagination, Box
} from "@mui/material";
import UserFormDialog from "./UserForm";
import { initialUsers } from "../data/data";
import { User } from "../type/type";


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
    <Box sx={{ margin: 4, top: 4 }}  data-testid="user-table">
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Add New User
        </Button>
      </Box>

      <TableContainer component={Paper} data-testid="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: (theme) => theme.palette.primary.main, }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>First Name</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Last Name</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}></TableCell>
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
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          data-testid="table-pagination"
        />
      </Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <UserFormDialog
          user={editingUser}
          users={users} 
          onSave={handleSaveUser}
          onCancel={() => setDialogOpen(false)}
        />
      </Dialog>
    </Box>
  );
}

export default UsersTable;
