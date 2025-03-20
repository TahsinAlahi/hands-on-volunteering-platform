import React from "react";

function ProfileEventCard({ event }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md border border-gray-300">
      <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
      <p className="text-sm text-gray-700 mt-1">{event.description}</p>
      <p className="text-sm text-gray-600 mt-1 font-medium">
        Category: {event.category}
      </p>
      <p className="text-sm text-gray-600 mt-1">
        📅 {new Date(event.date).toDateString()} | ⏰ {event.time}
      </p>
      <p className="text-sm text-gray-600 mt-1">📍 {event.location}</p>
      <p className="text-sm text-gray-600 mt-1">
        👤 Hosted by {event?.createdBy?.name}
      </p>
      <p className="text-sm text-gray-600 mt-1">
        🙌 {event.attendees.length} Attendees
      </p>
    </div>
  );
}

export default ProfileEventCard;
