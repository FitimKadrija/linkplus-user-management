import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../features/users/usersSlice";
import { showSnackbar } from "../features/ui/uiSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Alert,
} from "@mui/material";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function UserFormDialog({ open, onClose, mode = "add", user }) {
  const dispatch = useDispatch();
  const isEdit = mode === "edit";

  const initial = useMemo(
    () => ({
      name: user?.name || "",
      email: user?.email || "",
      company: user?.company?.name || "",
    }),
    [user]
  );

  const [form, setForm] = useState(initial);
  const [err, setErr] = useState("");

  useEffect(() => {
    setForm(initial);
    setErr("");
  }, [initial, open]);

  const handleChange = (k) => (e) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (!emailRegex.test(form.email.trim())) return "Email is not valid";
    return "";
  };

  const onSubmit = () => {
    const e = validate();
    if (e) return setErr(e);

    if (isEdit) {
      dispatch(
        updateUser({
          id: user.id,
          changes: {
            name: form.name.trim(),
            email: form.email.trim(),
            company: { name: form.company.trim() || "Company" },
          },
        })
      );
      dispatch(showSnackbar({ message: "User updated ✅", severity: "info" }));
    } else {
      dispatch(
        addUser({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
        })
      );
      dispatch(showSnackbar({ message: "User added ✅", severity: "success" }));
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Edit User" : "Add New User"}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {err && <Alert severity="error">{err}</Alert>}

          <TextField
            label="Name *"
            value={form.name}
            onChange={handleChange("name")}
          />
          <TextField
            label="Email *"
            value={form.email}
            onChange={handleChange("email")}
          />
          <TextField
            label="Company"
            value={form.company}
            onChange={handleChange("company")}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSubmit}>
          {isEdit ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}