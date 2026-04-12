import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import RTLController from './components/RTLController.jsx'
import { IdProvider } from "../context/idContext";
import { OrderDetailsProvider } from "../context/orderDetailsContext";
import { SearchInputProvider } from "../context/searshInputContext";
import { RefreshProvider } from "../context/refreshContext";
import { NamePageInAdminProvider } from "../context/namePageInAdmin";
import { ToastContainer } from "react-toastify";


export default function RootLayout({ children }) {
  const lang = typeof window !== 'undefined' ? localStorage.getItem("lang") : '';
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} >
      <body >

        <ToastContainer
          position={lang === "ar" ? "bottom-left" : "bottom-right"} />

        <LanguageProvider>
          <RTLController>
            <IdProvider>

              <SearchInputProvider>
                <RefreshProvider>
                  <OrderDetailsProvider>
                    <NamePageInAdminProvider>
                      {children}

                    </NamePageInAdminProvider>

                  </OrderDetailsProvider>
                </RefreshProvider>
              </SearchInputProvider>
            </IdProvider>
          </RTLController>
        </LanguageProvider>
      </body>
    </html>
  );
}
