import React from "react";
import Navbar from "./Navbar";

const Layouts = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto h-[200vh]">{children}</div>
    </>
  );
};

export default Layouts;
