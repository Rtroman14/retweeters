import "../styles/globals.scss";

import { ThemeProvider } from "@mui/material/styles";
import { globalTheme } from "../src/globalTheme";

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={globalTheme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
