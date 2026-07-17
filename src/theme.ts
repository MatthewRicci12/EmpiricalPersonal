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
        fontFamily: '"Manrope Variable", "Segoe UI", sans-serif',
        h1: {
        fontSize: "3.3rem",
        fontWeight: 800,
        letterSpacing: "-0.05em",
        },
        h2: {
        fontSize: "2.5rem",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        },
        h3: {
        fontSize: "1.82rem",
        fontWeight: 780,
        letterSpacing: "-0.03em",
        },
        h4: {
        fontSize: "1.42rem",
        fontWeight: 760,
        letterSpacing: "-0.025em",
        },
        h5: {
        fontSize: "1.08rem",
        fontWeight: 740,
        },
        h6: {
        fontSize: "0.9rem",
        fontWeight: 720,
        textTransform: "uppercase",
        letterSpacing: "0.075em",
        },
        body1: {
        fontSize: "0.95rem",
        lineHeight: 1.65,
        },
        body2: {
        fontSize: "0.86rem",
        lineHeight: 1.55,
        },
        button: {
        fontWeight: 760,
        fontSize: "0.92rem",
        letterSpacing: "0.008em",
        textTransform: "none",
        },
    },



});

export default theme;