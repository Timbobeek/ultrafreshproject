// context/HeaderContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type HeaderData = {
  title?: ReactNode;
  subtext?: string | null;
  button?: boolean;
  redirect?: string;
  // add more as needed
};

const HeaderContext = createContext<[HeaderData, (data: HeaderData) => void]>([
  { title: "" },
  () => {},
]);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [headerData, setHeaderData] = useState<HeaderData>({});
  return (
    <HeaderContext.Provider value={[headerData, setHeaderData]}>
      {children}
    </HeaderContext.Provider>
  );
}

export const useHeader = () => useContext(HeaderContext);
