import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/users/usersSlice";
import {
  Alert, CircularProgress, Stack, Typography, Paper, Chip
} from "@mui/material";
import SearchSortBar from "../components/SearchSortBar";
import UserTable from "../components/UserTable";
import UserFormDialog from "../components/UserFormDialog";

export default function UsersPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.users);

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    if (status === "idle") dispatch(fetchUsers());
  }, [status, dispatch]);

  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    let data = items;

    if (q) {
      data = data.filter((u) => {
        const name = (u.name || "").toLowerCase();
        const email = (u.email || "").toLowerCase();
        return name.includes(q) || email.includes(q);
      });
    }

    const getVal = (u) => {
      if (sortKey === "company") return (u.company?.name || "").toLowerCase();
      return (u[sortKey] || "").toLowerCase();
    };

    data = [...data].sort((a, b) => {
      const va = getVal(a);
      const vb = getVal(b);
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [items, query, sortKey, sortDir]);

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h5" fontWeight={800}>
          Users
        </Typography>
        <Chip label={`${filteredSorted.length}`} />
      </Stack>

      <Paper sx={{ p: 2 }}>
        <SearchSortBar
          query={query}
          setQuery={setQuery}
          sortKey={sortKey}
          setSortKey={setSortKey}
          sortDir={sortDir}
          setSortDir={setSortDir}
          onAdd={() => setOpenAdd(true)}
        />
      </Paper>

      {status === "loading" && (
        <Stack direction="row" spacing={2} alignItems="center">
          <CircularProgress size={22} />
          <Typography>Loading users...</Typography>
        </Stack>
      )}

      {status === "failed" && <Alert severity="error">{error || "Error"}</Alert>}

      {status === "succeeded" && filteredSorted.length === 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography fontWeight={700}>No users found</Typography>
          <Typography sx={{ opacity: 0.8, mt: 0.5 }}>
            Try a different search term.
          </Typography>
        </Paper>
      )}

      {status === "succeeded" && filteredSorted.length > 0 && (
        <UserTable users={filteredSorted} />
      )}

      <UserFormDialog open={openAdd} onClose={() => setOpenAdd(false)} />
    </Stack>
  );
}