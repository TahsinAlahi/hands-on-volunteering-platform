import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DataErrorPage from "../components/DataErrorPage";
import HelpRequestCard from "../components/HelpRequestCard";

function HelpRequests() {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["help-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/help");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <DataErrorPage />;
  console.log(data);

  return (
    <div className="w-full min-h-screen">
      <main className="mx-auto flex flex-col items-center justify-center h-full my-10 px-6">
        <h1 className="text-3xl font-semibold border-b-2 border-black capitalize">
          Help Requests
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full">
          {data.map((help) => (
            <HelpRequestCard request={help} key={help._id} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default HelpRequests;
