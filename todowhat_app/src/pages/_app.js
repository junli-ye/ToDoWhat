import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // 动态加载 JS
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return <Component {...pageProps} />;
}
