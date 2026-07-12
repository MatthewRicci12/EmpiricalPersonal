import { alpha, createTheme, responsiveFontSizes } from "@mui/material/styles";
    
let theme = createTheme({
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