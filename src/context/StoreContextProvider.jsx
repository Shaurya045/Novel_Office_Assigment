import { useState } from "react";
import { StoreContext } from "./StoreContext";

const StoreContextProvider = (props) => {
  const [theme, setTheme] = useState("light");
  const [currency, setCurrency] = useState("USD");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const contextValue = {
    theme,
    toggleTheme,
    currency,
    setCurrency,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
