"use client";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { useLanguage } from "../context/LanguageContext";
import { useEffect, useState } from "react";
// import { Cairo } from 'next/font/google';
import { IdProvider } from "../context/idContext";
import { OrderDetailsProvider } from "../context/orderDetailsContext";
import { SearchInputProvider } from "../context/searshInputContext";
import { RefreshProvider } from "../context/refreshContext";
import { NamePageInAdminProvider } from "../context/namePageInAdmin";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
// import { metadata } from "../utils/functions";

function RTLController({ children }) {
  const { locale } = useLanguage();

  useEffect(() => {
   
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
    localStorage.setItem("lang", locale);
  }, [locale]);

  return <>{children}</>;
}
// metadata

// const cairo = Cairo({
//   subsets: ['arabic', 'latin'],
//   weight: ['200', '300', '400', '600', '700', '800', '900'],
//   variable: '--font-cairo',
// });

export default function RootLayout({ children }) {
   const lang = typeof window !== 'undefined'? localStorage.getItem("lang"):'';

   

  return (
    <html lang={lang} dir={lang == "ar"? "rtl" : "ltr"} >
      <body >
        
        <ToastContainer
          position={lang === "ar" ? "bottom-left" : "bottom-right"}/>

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
