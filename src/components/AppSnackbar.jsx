import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { hideSnackbar } from "../features/ui/uiSlice";

export default function AppSnackbar() {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((s) => s.ui.snackbar);

  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={() => dispatch(hideSnackbar())}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={() => dispatch(hideSnackbar())}
        severity={severity}
        variant="filled"
        sx={{ fontWeight: 700 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}