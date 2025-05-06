import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import Switch from "@mui/material/Switch";

function ThemeToggle() {
  const { toggleTheme } = useContext(StoreContext);
  return (
    <div>
      <Switch onClick={toggleTheme} />
    </div>
  );
}

export default ThemeToggle;
