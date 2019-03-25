import styles from "./custom.css";
import NavBar from "../component/NavBar";
import Menu from "../component/Menu";
import QutSection1 from "../component/section/QutSection1";
import QUTButton1 from "../component/QUTButton1";
import QutSection2 from "../component/section/QutSection2";
import FooterParent from "../component/FooterParent";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../component/theme";
export default function () {
  return (
    <MuiThemeProvider theme={theme}>
      <div className={styles.normal}>
        <NavBar />
        <Menu />
        <QutSection1
          title="Why Us"
          background="white"
          content={
            <div>
              Our research is focused on progress, pushing the boundaries and
              developing new ideas through transdisciplinary thinking.
              <br />
              <br /> Choose QUT if you're after a research university that's
              breaking new ground, working with true experts, and funding the
              future of research innovation in Australia.
              <br />
              <QUTButton1>See More</QUTButton1>
            </div>
          }
          buttonText="See More"
        />
        <QutSection2 title="Recent Event" />
        <QutSection1
          title="Get In Touch"
          theme="light"
          content={
            <div>
              Discover the impact of cancer in your suburb or town, with
              cutffwefwef efesearch tool the Australian Cancer Atlas.
              <br />
            </div>
          }
          buttonText="See More"
        />
        <FooterParent />
      </div>
    </MuiThemeProvider>
  );
}
