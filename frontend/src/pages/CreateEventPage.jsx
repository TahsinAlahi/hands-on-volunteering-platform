import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function timeConverter(time24) {
  let [hours, minutes] = time24.split(":").map(Number);
  let period;
  if (hours >= 12) {
    period = "PM";
  } else {
    period = "AM";
  }
  hours = hours % 12 || 12;
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes + " " + period;
}

function CreateEventPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosPrivate = useAxiosSecure();

  async function onSubmit(data) {
    const time = `${timeConverter(data.fromTime)} - ${timeConverter(
      data.toTime
    )}`;

    delete data.toTime;
    delete data.fromTime;
    const postData = { ...data, time: time, createdBy: user?.id };
    const res = await axiosPrivate.post("/events/create", postData);

    if (res.status === 201) {
      toast.success("Event created successfully");
      navigate("/events");
    }
  }

  return (
    <div className="w-full min-h-screen">
      <main className="mx-auto flex flex-col items-center justify-center h-full my-10">
        <h1 className="text-3xl font-semibold border-b-2 border-black capitalize mb-6">
          Create Event
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          {/* Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title", { required: "Title is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              type="text"
              {...register("category", { required: "Category is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="community">Community Service</option>
              <option value="education">Education</option>
              <option value="health">Health & Wellness</option>
              <option value="environmental">Environmental Impact</option>
              <option value="charity">Charity & Support </option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category.message}</p>
            )}
          </div>

          {/* Date */}
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              {...register("date", { required: "Date is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.date && (
              <p className="text-red-500 text-xs">{errors.date.message}</p>
            )}
          </div>

          {/* From Time */}
          <div className="mb-4">
            <label
              htmlFor="fromTime"
              className="block text-sm font-medium text-gray-700"
            >
              From Time
            </label>
            <input
              id="fromTime"
              type="time"
              {...register("fromTime", { required: "From Time is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.fromTime && (
              <p className="text-red-500 text-xs">{errors.time.message}</p>
            )}
          </div>

          {/* To Time */}
          <div className="mb-4">
            <label
              htmlFor="toTime"
              className="block text-sm font-medium text-gray-700"
            >
              To Time
            </label>
            <input
              id="toTime"
              type="time"
              {...register("toTime", { required: "From Time is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.toTime && (
              <p className="text-red-500 text-xs">{errors.time.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              {...register("location", { required: "Location is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.location && (
              <p className="text-red-500 text-xs">{errors.location.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 px-4 rounded-md shadow-md  cursor-pointer"
          >
            Create Event
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateEventPage;
