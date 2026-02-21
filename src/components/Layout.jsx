import { Outlet, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Stack,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../features/ui/uiSlice";
import AppSnackbar from "./AppSnackbar";

export default function Layout() {
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.ui.mode);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          mode === "dark"
            ? "radial-gradient(1200px 600px at 20% 0%, rgba(37,99,235,0.18), transparent 60%), radial-gradient(1000px 500px at 90% 10%, rgba(124,58,237,0.16), transparent 55%), linear-gradient(180deg, #0b1220 0%, #0b1220 100%)"
            : "radial-gradient(1200px 600px at 20% 0%, rgba(37,99,235,0.16), transparent 60%), radial-gradient(1000px 500px at 90% 10%, rgba(124,58,237,0.16), transparent 55%), linear-gradient(180deg, #f6f7fb 0%, #f3f4f6 60%, #f6f7fb 100%)",
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: mode === "dark" ? "rgba(15,23,42,0.72)" : "rgba(255,255,255,0.78)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(148,163,184,0.18)",
        }}
      >
        <Toolbar>
          <Stack spacing={0.3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h6" sx={{ lineHeight: 1.1 }}>
                LinkPlus User Management
              </Typography>
              <Chip size="small" label="React" sx={{ fontWeight: 700 }} />
              <Chip size="small" label="Redux" variant="outlined" />
            </Stack>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Internship Challenge • Users • Search • Details • CRUD
            </Typography>
          </Stack>

          <Box sx={{ flex: 1 }} />

          <Tooltip title={mode === "dark" ? "Switch to Light" : "Switch to Dark"}>
            <IconButton onClick={() => dispatch(toggleMode())} sx={{ mr: 1 }}>
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Button component={Link} to="/" variant="outlined">
            Users
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>
        <Outlet />
      </Container>

      <AppSnackbar />
    </Box>
  );
}