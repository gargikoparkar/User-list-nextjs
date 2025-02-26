"use client"
import React, { useState, useEffect } from "react";
import {
  DialogTitle, DialogContent, DialogActions, Button, TextField,
  Box
} from "@mui/material";
import { User } from "../type/type";
import validateUserInput from "../utils/validations";

interface UserFormDialogProps {
  users: User[];
  user: User | null;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const UserFormDialog: React.FC<UserFormDialogProps> = ({ user, users, onSave, onCancel }) => {
  const [formData, setFormData] = useState<User>({ id: 0, first_name: "", last_name: "", email: "" });
  const [errors, setErrors] = useState<{ first_name?: string; last_name?: string; email?: string }>({});

  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const validationErrors = validateUserInput(
      formData.first_name,
      formData.last_name,
      formData.email,
      users,
      formData.id
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(formData);
    setSuccessMessage("User added successfully!");
    setTimeout(() => {
      setSuccessMessage("");
      onCancel();
    }, 3000);
  };

  return (
    <Box data-testid="user-form">
      <DialogTitle>{user ? "Edit User" : "Add New User"}</DialogTitle>
      <DialogContent data-testid="dialogbox-container">
        <TextField label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          fullWidth margin="dense"
          required
          error={!!errors.first_name}
          helperText={errors.first_name} />
        <TextField label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          fullWidth margin="dense"
          required
          error={!!errors.last_name}
          helperText={errors.first_name} />
        <TextField label="Email"
          name="email" value={formData.email}
          onChange={handleChange}
          fullWidth margin="dense"
          required
          error={!!errors.email}
          helperText={errors.email} />

        {successMessage && (
          <p style={{ color: "green", marginTop: 10 }}>{successMessage}</p>
        )}
      </DialogContent>
      <DialogActions data-testid="dialog-buttons">
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", gap: 2 }} >
          <Button variant="contained" color="primary" sx={{ justifyContent: "center" }} onClick={() => {
            onCancel();
          }}>Cancel</Button>
          <Button variant="contained" color="primary" sx={{ justifyContent: "center" }} onClick={() => {
            handleSubmit();
          }}>Submit</Button>
        </Box>
      </DialogActions>
    </Box>
  );
}
export default UserFormDialog
