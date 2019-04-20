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
                borderRadius: 0
            }
        }

    }
});

export default theme;
