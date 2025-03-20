import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useAuth } from "../providers/AuthProvider";
import { toast } from "react-toastify";

function EventCard({ event, refetch }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  async function handleJoinEvent() {
    try {
      const res = await axiosSecure.post(`/events/join/${event._id}`, {
        userId: user.id,
      });
      refetch();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const isJoined = event.attendees?.includes(user.id);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md border border-gray-300 flex items-center justify-between flex-col">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">{event?.title}</h3>
        <p className="text-sm text-gray-700 mt-1">{event?.description}</p>
        <p className="text-sm text-gray-600 mt-1 font-medium">
          Category: {event?.category}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          📅 {new Date(event?.date).toDateString()} | ⏰ {event?.time}
        </p>
        <p className="text-sm text-gray-600 mt-1">📍 {event?.location}</p>
        <p className="text-sm text-gray-600 mt-1">
          👤 Hosted by {event?.createdBy?.name || "User"}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          🙌 {event.attendees?.length} Attendees
        </p>
      </div>
      <button
        className="bg-primary text-white px-4 py-2 rounded mt-5 cursor-pointer w-full hover:bg-primary/70 disabled:cursor-not-allowed disabled:bg-primary/50"
        onClick={handleJoinEvent}
        disabled={isJoined}
      >
        {isJoined ? "Joined" : "Join"}
      </button>
    </div>
  );
}

export default EventCard;
