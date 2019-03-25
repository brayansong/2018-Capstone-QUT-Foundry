import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    primary: {
      lightest: "#0066B9",
      light: "#00467F",
      main: "#003C71",
      dark: "#003866",
      darkest: "#012A4C"
    },
    secondary: green
  },
  status: {
    danger: "orange"
  },
  root: {
    background: 'black',
    height: '100%'
  },
});

export default theme;
