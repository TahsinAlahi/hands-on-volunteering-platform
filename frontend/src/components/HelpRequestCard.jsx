import { Link } from "react-router";

function HelpRequestCard({ request }) {
  request.urgency = "Medium";
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md border border-gray-300 flex items-center justify-between flex-col">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">
          {request?.title}
        </h3>
        <p className="text-sm text-gray-700 mt-1">{request?.description}</p>
        <p className="text-sm text-gray-600 mt-1 font-medium">
          Urgency:{" "}
          <span
            className={`font-semibold px-4 py-0.5 rounded-lg text-white ${
              request.urgency === "Urgent"
                ? "bg-red-500"
                : request?.urgency === "Medium"
                ? "bg-orange-700"
                : "bg-yellow-500"
            }`}
          >
            {request.urgency}
          </span>
        </p>
        <p className="text-sm text-gray-600 mt-1">
          👤 Posted by {request?.createdBy?.name || "User"}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          💬 {request.responses?.length} responses
        </p>
      </div>
      <Link
        className="bg-primary text-white px-4 py-2 rounded mt-5 cursor-pointer w-full hover:bg-primary/70 disabled:cursor-not-allowed disabled:bg-primary/50 text-center"
        to={`/help-requests/${request._id}`}
      >
        Details
      </Link>
    </div>
  );
}

export default HelpRequestCard;
