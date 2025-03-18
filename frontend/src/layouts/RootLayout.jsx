import React from "react";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <div className="font-poppins">
      <Outlet />
    </div>
  );
}

export default RootLayout;
