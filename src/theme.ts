import { alpha, createTheme, responsiveFontSizes } from "@mui/material/styles";
    
let theme = createTheme({
    palette: {
        mode: "light",
        primary: {
        main: "#163a5f",
        light: "#2b5c8f",
        dark: "#0d2742",
        contrastText: "#f8fbff",
        },
        secondary: {
        main: "#22d3ee",
        light: "#67e8f9",
        dark: "#0891b2",
        contrastText: "#0b2230",
        },
        background: {
        default: "#eef7ff",
        paper: "#f9fcff",
        },
        success: {
        main: "#2d7a52",
        },
        error: {
        main: "#b44938",
        },
        warning: {
        main: "#b5852d",
        },
        text: {
        primary: "#14263d",
        secondary: "#61758d",
        },
        divider: alpha("#21364f", 0.12),
    },

    components: {
        MuiButton: {
        defaultProps: {
            disableElevation: true,
        },
        styleOverrides: {
            root: {
            borderRadius: 999,
            paddingInline: 18,
            paddingBlock: 10,
            },
            containedPrimary: {
            boxShadow: "0 18px 42px rgba(22, 58, 95, 0.22)",
            },
            outlined: {
            borderColor: alpha("#21364f", 0.14),
            },
        },
        },
    },
    typography: {
        button: {
        fontWeight: 760,
        fontSize: "0.92rem",
        letterSpacing: "0.008em",
        textTransform: "none",
        },
    }




});

export default theme;