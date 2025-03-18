import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { Bounce, ToastContainer } from "react-toastify";

function RootLayout() {
  return (
    <div className="font-poppins">
      <Navbar />
      <Outlet />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default RootLayout;
