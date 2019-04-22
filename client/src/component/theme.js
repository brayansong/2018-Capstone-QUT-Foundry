import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
    palette: {

        secondary: {
            lightest: "#0066B9",
            light: "#00467F",
            main: "#003C71",
            dark: "#003866",
            darkest: "#012A4C"
        },
        primary: {
            lightest: "#0066B9",
            light: "#00467F",
            main: "#003C71",
            dark: "#003866",
            darkest: "#012A4C"
        },
    },
    typography: {
        "fontFamily": "\"Helvetica\", \"Arial\", sans-serif",
        fontWeightRegular: 400,
        fontWeightMedium: 600,

        body1: {
            fontWeight: 500,
        },
        subtitle1: {
            fontSize: 12,
        },
        button: {
            textTransform: 'initial',
            fontWeight: 'bolder',
            fontSize: 15.3
        },
    },
    status: {
        danger: "orange"
    },
    overrides: {
        Appointment: {
            appointment: {
                background: '#003C71'
            }
        },
        HorizontalViewLayout: {
            container: {
                height: 400
            }
        },
        VerticalViewLayout: {
            container: {
                height: 500
            }
        },
        MuiOutlinedInput: {
            input: {
                padding: '14px 14px'
            }
        },
        MuiPrivateNotchedOutline: {
            root: {
                borderRadius: 0
            }
        },
        MuiPaper: {
            rounded: {
                borderRadius: 0
            }
        },

        MuiButton: {
            root: {
                borderRadius: 0,
            }
        },
        MuiTab: {
            textColorInherit: {
                opacity: 0.9
            }
        },
        MuiPaper: {
            elevation4: {
                boxShadow: "none"
            }
        }
    }
});

export default theme;
