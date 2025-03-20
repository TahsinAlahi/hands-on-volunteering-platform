import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ProfileEventCard from "../components/ProfileEventCard";

function ProfilePage() {
  const { user } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const axiosPrivate = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["user", user?.id],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/users/${user?.id}`);
      return res.data;
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(data);

  return (
    <div className=" w-full min-h-svh">
      <main className="mx-auto flex flex-col items-center justify-center h-full mt-8 px-4">
        <h1 className="text-3xl font-semibold border-b-2 border-black capitalize">
          Welcome,{user.name}
        </h1>

        <div className="flex items-start justify-center flex-col gap-2 my-10">
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>Causes: {data.causes.join(", ")}</p>
          <p>Skills: {data.skills.join(", ")}</p>
          <div>
            <h2 className="text-2xl font-semibold border-b-2 border-black">
              Event History
            </h2>

            {/* cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {data.events.map((event) => (
                <ProfileEventCard event={event} key={event._id} />
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsEditOpen(true)}
          className="text-white text-sm font-semibold bg-accent hover:bg-secondary px-5 py-1 rounded-lg transition duration-300 ease-in-out"
        >
          Edit Profile
        </button>
      </main>
    </div>
  );
}

export default ProfilePage;
