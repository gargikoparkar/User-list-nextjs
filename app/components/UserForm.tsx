"use client"
import { useState, useEffect } from "react";
import {
  DialogTitle, DialogContent, DialogActions, Button, TextField
} from "@mui/material";
import { User } from "../lib/type";


interface UserFormDialogProps {
  user: User | null;
  onSave: (user: User) => void;
  onCancel: () => void;
}

export default function UserFormDialog({ user, onSave, onCancel }: UserFormDialogProps) {
  const [formData, setFormData] = useState<User>({ id: 0, first_name: "", last_name: "", email: "" });
  const [errors, setErrors] = useState<{ email?: string }>({});

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { email?: string } = {};
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email address";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSave(formData);
  };

  return (
    <>
      <DialogTitle>{user ? "Edit User" : "Add New User"}</DialogTitle>
      <DialogContent>
        <TextField label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} fullWidth margin="dense" required />
        <TextField label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} fullWidth margin="dense" required />
        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth margin="dense" required error={!!errors.email} helperText={errors.email} />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={() => {
          handleSubmit();
          onCancel();
        }}>Submit</Button>
      </DialogActions>
    </>
  );
}
