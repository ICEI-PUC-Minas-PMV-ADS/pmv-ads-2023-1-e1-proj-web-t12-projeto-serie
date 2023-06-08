import React, { createContext, useState, useEffect } from 'react';

// Create the context
interface LocalStorageContextType {
  selectedFilter: string;
  updateSelectedFilter: (filter: string) => void;
}

const LocalStorageContext = createContext<LocalStorageContextType>({
  selectedFilter: '',
  updateSelectedFilter: () => {}
});

// Create a provider component
const LocalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  // Load the initial value from localStorage on component mount
  useEffect(() => {
    const storedFilter = localStorage.getItem('selectedFilter');
    if (storedFilter) {
      setSelectedFilter(storedFilter);
    }
  }, []);

  // Update the selectedFilter state and store it in localStorage
  const updateSelectedFilter = (filter: string) => {
    setSelectedFilter(filter);
    localStorage.setItem('selectedFilter', filter);
  };

  return (
    <LocalStorageContext.Provider value={{ selectedFilter, updateSelectedFilter }}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export { LocalStorageContext, LocalProvider };
