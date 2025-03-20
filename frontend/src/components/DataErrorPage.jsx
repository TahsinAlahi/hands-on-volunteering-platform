import React from "react";
import { Link } from "react-router";

function DataErrorPage() {
  return (
    <main className="min-h-screen max-w-screen-xl mx-auto flex items-center justify-center gap-2 flex-col">
      <h1 className="text-3xl font-semibold">
        Sorry this page is not available
      </h1>
      <p className="text-xl">Please try again later</p>
      <Link
        to="/home"
        className="text-lg px-4 py-1 border-black border-1 rounded-md font-semibold"
      >
        Go back
      </Link>
    </main>
  );
}

export default DataErrorPage;
