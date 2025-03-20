import React, { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DataErrorPage from "../components/DataErrorPage";
import HelpRequestCard from "../components/HelpRequestCard";
import { useForm } from "react-hook-form";
import { useAuth } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function HelpRequests() {
  const axiosSecure = useAxiosSecure();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["help-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/help");
      return res.data;
    },
  });
  async function handleFormSubmit(data) {
    const postData = { ...data, createdBy: user?.id };
    const res = await axiosSecure.post("/help/create", postData);
    if (res.status === 201) {
      toast.success("Help request created successfully");
      setIsCreateOpen(false);
      refetch();
    }
  }

  if (isLoading) return <Loader />;
  if (isError) return <DataErrorPage />;

  return (
    <div className="w-full min-h-screen">
      <main className="mx-auto flex flex-col items-center justify-center h-full my-10 px-6">
        <h1 className="text-3xl font-semibold border-b-2 border-black capitalize">
          Help Requests
        </h1>

        {!isCreateOpen && (
          <button
            className="text-lg px-4 py-1 border-black border-1 rounded-md font-semibold mt-5 cursor-pointer"
            onClick={() => setIsCreateOpen(true)}
          >
            Request for Help
          </button>
        )}

        {isCreateOpen && (
          <form
            className="flex flex-col gap-3 w-full max-w-md my-3"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            {/* Title Field */}
            <label className="flex flex-col">
              Title
              <input
                type="text"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 8,
                    message: "Title must be at least 8 characters",
                  },
                })}
                className="border p-2 rounded"
                placeholder="Title"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </label>

            {/* Description Field */}
            <label className="flex flex-col">
              Description
              <textarea
                {...register("description", {
                  required: "Description is required",
                  maxLength: {
                    value: 100,
                    message: "Description must be at most 100 characters",
                  },
                })}
                className="border p-2 rounded"
                placeholder="Description"
                rows={3}
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </label>

            {/* Urgency Field */}
            <label className="flex flex-col">
              Urgency
              <select
                {...register("urgency", { required: "Urgency is required" })}
                className="border p-2 rounded"
              >
                <option value="">Select urgency</option>
                <option value="Urgent">Urgent</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              {errors.urgency && (
                <span className="text-red-500 text-sm">
                  {errors.urgency.message}
                </span>
              )}
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="text-lg px-4 py-1 border-black border-1 rounded-md font-semibold mt-2 cursor-pointer hover:bg-primary hover:text-white transition-all duration-300"
            >
              Submit
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              className="text-lg px-4 py-1 border-black border-1 rounded-md font-semibold mt-2 cursor-pointer"
              onClick={() => setIsCreateOpen(false)}
            >
              Cancel
            </button>
          </form>
        )}

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
