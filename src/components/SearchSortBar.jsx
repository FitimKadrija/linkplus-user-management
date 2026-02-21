import {
  Stack,
  TextField,
  Button,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function SearchSortBar({
  query,
  setQuery,
  sortKey,
  setSortKey,
  sortDir,
  setSortDir,
  onAdd,
}) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      alignItems={{ md: "center" }}
    >
      <TextField
        fullWidth
        label="Search by name or email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <TextField
        select
        label="Sort by"
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="email">Email</MenuItem>
        <MenuItem value="company">Company</MenuItem>
      </TextField>

      <ToggleButtonGroup
        exclusive
        value={sortDir}
        onChange={(_, v) => v && setSortDir(v)}
        size="medium"
      >
        <ToggleButton value="asc">Asc</ToggleButton>
        <ToggleButton value="desc">Desc</ToggleButton>
      </ToggleButtonGroup>

      <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
        Add User
      </Button>
    </Stack>
  );
}