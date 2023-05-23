import React, { createContext, useState } from "react";

interface ISearchCtxProps {
    searchValue: string
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

const SearchContext = createContext<ISearchCtxProps>({
  searchValue: "",
  setSearchValue: () => {},
});

function Provider({ children }: { children: React.ReactNode }) {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, Provider };
