"use client";

import { createContext, useContext, useState } from "react";

const SearchInputContext = createContext(undefined);

export function SearchInputProvider({ children }) {
  const [selectedSearchInput, setSelectedSearchInput] = useState("");

 

  return (
    <SearchInputContext.Provider
      value={{
        selectedSearchInput,
        setSelectedSearchInput,
   
      }}
    >
      {children}
    </SearchInputContext.Provider>
  );
}

export function useSearshInputContext() {
  const context = useContext(SearchInputContext);
  if (!context) {
    throw new Error("useSearshInputContext must be used within IdProvider");
  }
  return context;
}
