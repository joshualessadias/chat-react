"use client";

import { createTheme } from "@mui/material";
import { grey, lime, teal } from "@mui/material/colors";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: teal[500],
      light: teal[100],
      dark: teal[900],
    },
    secondary: {
      main: lime[500],
      light: lime[100],
      dark: lime[900],
    },
    info: {
      main: grey[600],
    },
    background: {
      default: "#0a0c0c",
      paper: "#0a0c0c",
    },
  },
  typography: {
    fontFamily: "monospace",
  },
  shape: {
    borderRadius: 24,
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 2,
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 2,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        style: {
          borderRadius: 16,
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
        style: {
          paddingTop: 24,
          paddingBottom: 24,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiAppBar: {
      defaultProps: {
        position: "sticky",
      },
    },
  },
});
