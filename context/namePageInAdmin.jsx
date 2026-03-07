"use client";

import { createContext, useContext, useState } from "react";

const NamePageInAdminContext = createContext(undefined);

export function NamePageInAdminProvider({ children }) {
  const [selectedNamePage, setSelectedNamePage] = useState("");

 

  return (
    <NamePageInAdminContext.Provider
      value={{
        selectedNamePage,
        setSelectedNamePage,
   
      }}
    >
      {children}
    </NamePageInAdminContext.Provider>
  );
}

export function useNamePageInAdminContext() {
  const context = useContext(NamePageInAdminContext);
  if (!context) {
    throw new Error("useNamePageInAdminContext must be used within NamePageInAdminProvider");
  }
  return context;
}
