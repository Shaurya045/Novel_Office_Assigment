import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { StoreContext } from "./context/StoreContext";

function App() {
  const { theme } = useContext(StoreContext);

  const textColor = theme === "light" ? "text-black" : "text-white";
  const bgColor = theme === "light" ? "bg-white" : "bg-black";

  return (
    <div className="w-full h-full ">
      <Navbar />
      <div
        className={`${bgColor} ${textColor} w-full min-h-screen px-[40px]  md:px-[130px] pt-[20px]`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default App;
