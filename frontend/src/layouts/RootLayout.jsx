import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

function RootLayout() {
  return (
    <div className="font-poppins">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default RootLayout;
