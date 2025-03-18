import React from "react";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default RootLayout;
