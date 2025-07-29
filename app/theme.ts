// "use client";
// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   typography: {
//     fontFamily: "var(--font-roboto)",
//   },
// });

// export default theme;

"use client";
import { createTheme } from "@mui/material/styles";

// Font fallback kalau --font-roboto gagal
const fallbackFonts = [
  "Roboto",
  "Inter",
  "Segoe UI",
  "Helvetica Neue",
  "Arial",
  "sans-serif",
];

const theme = createTheme({
  palette: {
    mode: "light", // bisa diganti jadi 'dark' sesuai kebutuhan
    primary: {
      main: "#005BAC", // biru Jasa Marga? ganti sesuai brand kamu
    },
    secondary: {
      main: "#F9C500", // kuning untuk aksen
    },
    error: {
      main: "#D32F2F",
    },
    background: {
      default: "#F9FAFB", // warna dashboard modern
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1F2937", // slate-800
      secondary: "#6B7280", // slate-500
    },
  },
  typography: {
    fontFamily: `var(--font-roboto), ${fallbackFonts.join(",")}`,
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#6B7280",
    },
    button: {
      textTransform: "none", // biar tombol gak semua kapital
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
  },
});

export default theme;

