import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider, useSelector } from "react-redux";
import { store } from "./app/store.js";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function ThemedApp() {
  const mode = useSelector((s) => s.ui.mode);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#2563eb" },
          secondary: { main: "#7c3aed" },
          background: {
            default: mode === "dark" ? "#0b1220" : "#f6f7fb",
            paper: mode === "dark" ? "#0f172a" : "#ffffff",
          },
        },
        shape: { borderRadius: 14 },
        typography: {
          fontFamily: [
            "Inter",
            "system-ui",
            "-apple-system",
            "Segoe UI",
            "Roboto",
            "Arial",
            "sans-serif",
          ].join(","),
          h5: { fontWeight: 800 },
          h6: { fontWeight: 800 },
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                border: "1px solid rgba(148, 163, 184, 0.18)",
                boxShadow: "0 10px 30px rgba(2, 6, 23, 0.20)",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: { textTransform: "none", borderRadius: 12, fontWeight: 700 },
            },
          },
          MuiTextField: { defaultProps: { size: "small" } },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  </React.StrictMode>
);