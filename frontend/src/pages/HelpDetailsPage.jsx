import React from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DataErrorPage from "../components/DataErrorPage";
import { toast } from "react-toastify";
import { useAuth } from "../providers/AuthProvider";

function HelpDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: helpRequest,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["help-request", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/help/${id}`);
      return res.data;
    },
  });

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const message = e.target.message.value;
      await axiosSecure.post(`/help/response/${id}`, {
        userId: user.id,
        message,
      });
      toast.success("Response sent successfully");
      refetch();
      e.target.reset();

      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Couldn't send response, try again");
    }
  }

  if (isLoading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <DataErrorPage />;

  return (
    <div className="w-full min-h-screen">
      <main className="mx-auto flex flex-col items-center my-10 px-6">
        <h1 className="text-3xl font-semibold border-b-2 border-black capitalize">
          {helpRequest?.title}
        </h1>

        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 border border-gray-300 mt-5">
          <p className="text-gray-800 text-lg font-medium">
            {helpRequest?.description}
          </p>
          <p className="text-sm text-gray-700 mt-2">
            <span className="font-semibold">Urgency:</span>{" "}
            <span
              className={`px-2 py-1 text-white rounded ${
                helpRequest?.urgency === "Urgent"
                  ? "bg-red-500"
                  : helpRequest?.urgency === "Medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {helpRequest?.urgency}
            </span>
          </p>

          <p className="text-sm text-gray-600 mt-2">
            <span className="font-semibold">Created By:</span>{" "}
            {helpRequest?.createdBy?.name || "Unknown"}
          </p>

          <h2 className="text-xl font-semibold mt-6 border-b border-gray-300 pb-2">
            Responses
          </h2>

          {helpRequest?.responses?.length > 0 ? (
            <div className="mt-3">
              {helpRequest.responses.map((response) => (
                <div
                  key={response._id}
                  className="border border-gray-200 rounded-lg p-3 mt-2 bg-gray-50"
                >
                  <p className="text-sm font-semibold text-gray-800">
                    {response.userId?.name || "User "}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    {response.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(response.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 mt-3">No responses yet.</p>
          )}

          <h2 className="text-xl font-semibold mt-6 border-b border-gray-300 pb-2">
            Add Response
          </h2>

          <form onSubmit={handleSubmit} className="mt-3">
            <textarea
              name="message"
              id="message"
              placeholder="Your response..."
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-50 text-sm"
            />
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-primary text-white font-semibold py-2 px-4 rounded mt-2 cursor-pointer"
              >
                Submit
              </button>
              <Link
                to="events"
                className="bg-primary text-white font-semibold py-2 px-4 rounded mt-2"
              >
                Go back
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default HelpDetailsPage;
