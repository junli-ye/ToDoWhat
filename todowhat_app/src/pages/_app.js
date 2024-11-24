import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect } from "react";
import "@/i18n";

export default function App({ Component, pageProps }) {
  // Dynamically loading Bootstrap JS
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // Get layout function
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
