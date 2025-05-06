import { useContext } from "react";
import { StoreContext } from "./context/StoreContext";

function App() {
  const { theme } = useContext(StoreContext);
  return <>Theme: {theme}</>;
}

export default App;
