import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../features/users/usersSlice";
import { showSnackbar } from "../features/ui/uiSlice";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Stack,
  Paper,
  Avatar,
  Tooltip,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import UserFormDialog from "./UserFormDialog";

function initials(name = "") {
  const parts = name.trim().split(" ").filter(Boolean);
  const a = parts[0]?.[0] || "";
  const b = parts[1]?.[0] || "";
  return (a + b).toUpperCase();
}

export default function UserTable({ users }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    dispatch(showSnackbar({ message: "User deleted 🗑️", severity: "warning" }));
  };

  return (
    <Paper sx={{ overflow: "hidden" }}>
      <Box sx={{ overflowX: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 800 }}>User</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 800 }}>Company</TableCell>
              <TableCell align="right" sx={{ fontWeight: 800 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((u) => (
              <TableRow
                key={u.id}
                hover
                onClick={() => navigate(`/users/${u.id}`)}
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "rgba(37,99,235,0.04)" },
                }}
              >
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar
                      sx={{
                        width: 38,
                        height: 38,
                        fontWeight: 800,
                        background:
                          "linear-gradient(135deg, rgba(37,99,235,0.95), rgba(124,58,237,0.95))",
                      }}
                    >
                      {initials(u.name)}
                    </Avatar>

                    <Stack spacing={0.2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ fontWeight: 800 }}>{u.name}</Box>
                        {u.isLocal && <Chip size="small" label="Local" />}
                      </Stack>
                      <Box sx={{ fontSize: 12, opacity: 0.7 }}>ID: {u.id}</Box>
                    </Stack>
                  </Stack>
                </TableCell>

                <TableCell sx={{ opacity: 0.9 }}>{u.email}</TableCell>
                <TableCell sx={{ opacity: 0.9 }}>{u.company?.name}</TableCell>

                <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                  <Tooltip title="Details">
                    <IconButton onClick={() => navigate(`/users/${u.id}`)}>
                      <OpenInNewIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Edit">
                    <IconButton onClick={() => setEditUser(u)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(u.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <UserFormDialog
        open={!!editUser}
        onClose={() => setEditUser(null)}
        mode="edit"
        user={editUser}
      />
    </Paper>
  );
}