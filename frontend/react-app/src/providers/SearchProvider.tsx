import React, { useState, createContext } from 'react';

export interface SearchContextType {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType>({
  query: '',
  setQuery: () => {},
});

export const SearchProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [query, setQuery] = useState<string>('');

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
