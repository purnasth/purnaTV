import React, { createContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/Api";

export const DataContext = createContext();

export const AppContext = (props) => {
  const [loading, setLoading] = useState("loading");
  const [searchResults, setSearchResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    fetchSelectedCategoryData(selectedCategory);
  }, [selectedCategory]);

  const fetchSelectedCategoryData = async (query) => {
    setLoading(true);
    const data = await fetchDataFromApi(`search/?q=${query}`);
    // console.log(data.contents); //i did data.contents because the api gives all video data inside contents
    setSearchResults(data.contents);
    setLoading(false);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  useEffect(() => {
    if (theme === "dark") {
      document.getElementById("root").classList.add("dark");
    } else {
      document.getElementById("root").classList.remove("dark");
    }
  }, [theme]);

  return (
    <DataContext.Provider
      value={{
        loading,
        setLoading,
        searchResults,
        selectedCategory,
        setSelectedCategory,
        mobileMenu,
        setMobileMenu,
        theme,
        setTheme,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
