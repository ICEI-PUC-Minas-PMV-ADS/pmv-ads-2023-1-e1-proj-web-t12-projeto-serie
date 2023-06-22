import React, { createContext, useEffect, useState } from "react";

// Create the context
interface LocalStorageContextType {
  selectedFilter: selctedFilter;
  updateSelectedFilter: (filter: selctedFilter) => void;
  openFilter: boolean;
  handleOpenFilter: (filter: boolean) => void;
}

interface selctedFilter {
  movie: boolean;
  serie: boolean;
  language: string;
}

const LocalStorageContext = createContext<LocalStorageContextType>({
  selectedFilter: {
    movie: true,
    serie: false,
    language: "pt",
  },
  updateSelectedFilter: () => {},
  openFilter: false,
  handleOpenFilter: () => {},
});

// Create a provider component
const LocalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  let defaultValueFilter = {
    movie: true,
    serie: false,
    language: "pt",
  };
  const [selectedFilter, setSelectedFilter] = useState(defaultValueFilter);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  // Load the initial value from localStorage on component mount
  useEffect(() => {
    let storedFilter = localStorage.getItem("selectedFilter");
    if (storedFilter) {
      setSelectedFilter(JSON.parse(storedFilter));
    }
  }, []);

  // Update the selectedFilter state and store it in localStorage
  const updateSelectedFilter = (filter: selctedFilter) => {
    setSelectedFilter(filter);
    var objectString = JSON.stringify(filter);
    localStorage.setItem("selectedFilter", objectString);
  };

  // Update the openFilter state and store it in localStorage
  const handleOpenFilter = (filter: boolean) => {
    setOpenFilter(filter);
    // Convert the boolean value to a string
    var booleanString = openFilter.toString();
    localStorage.setItem("openFilter", booleanString);
  };

  // Load the initial value from localStorage on component mount
  useEffect(() => {
    const storedFilter = localStorage.getItem("openFilter");
    if (storedFilter) {
      setSelectedFilter(JSON.parse(storedFilter));
    }
  }, []);

  return (
    <LocalStorageContext.Provider
      value={{
        selectedFilter,
        updateSelectedFilter,
        handleOpenFilter,
        openFilter,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

export { LocalStorageContext, LocalProvider };
