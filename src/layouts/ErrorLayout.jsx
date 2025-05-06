import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

function ErrorLayout() {
  const { theme } = useContext(StoreContext);

  const textColor = theme === "light" ? "text-black" : "text-white";
  const bgColor = theme === "light" ? "bg-white" : "bg-black";

  return (
    <div className={`${bgColor} ${textColor} w-full h-screen`}>
      <Outlet />
    </div>
  );
}

export default ErrorLayout;
