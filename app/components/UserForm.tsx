"use client"
import React, { useState, useEffect } from "react";
import {
  DialogTitle, DialogContent, DialogActions, Button, TextField,
  Box
} from "@mui/material";
import { User } from "../type/type";
import { validateUserInput } from "../utils/validations";
interface UserFormDialogProps {
  user: User | null;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const UserFormDialog: React.FC<UserFormDialogProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState<User>({ id: 0, first_name: "", last_name: "", email: "" });
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const validate = () => {
    const newErrors: { first_name?: string; last_name?: string; email?: string } = {};

    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email address";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    const validationErrors = validateUserInput(formData.first_name, formData.last_name, formData.email);

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
    <>
      <DialogTitle>{user ? "Edit User" : "Add New User"}</DialogTitle>
      <DialogContent>
        <TextField label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} fullWidth margin="dense" required />
        <TextField label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} fullWidth margin="dense" required />
        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth margin="dense" required error={!!errors.email} helperText={errors.email} />

        {successMessage && (
          <p style={{ color: "green", marginTop: 10 }}>{successMessage}</p>
        )}
      </DialogContent>
      <DialogActions>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" color="primary" sx={{ justifyContent: "center" }} onClick={() => {
            onCancel();
          }}>Cancel</Button>
          <Button variant="contained" color="primary" sx={{ justifyContent: "center" }} onClick={() => {
            handleSubmit();
          }}>Submit</Button>
        </Box>
      </DialogActions>
    </>
  );
}
export default UserFormDialog
