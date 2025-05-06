import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <h1 className={`text-9xl font-bold mb-4 `}>404</h1>
          <h2 className={`text-3xl font-bold mb-4 `}>Page Not Found</h2>
          <Link to="/">
            <Button variant="outlined">GO HOME</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
