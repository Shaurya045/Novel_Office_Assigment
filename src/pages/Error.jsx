import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="flex flex-col gap-[10px] md:gap-[20px] h-full items-center justify-center px-[20px]">
      <p className="text-xl sm:text-2xl md:text-4xl font-normal text-center">
        Something went wrong in the application
      </p>
      <Link to="/">
        <Button variant="outlined">GO HOME</Button>
      </Link>
    </div>
  );
}

export default Error;
