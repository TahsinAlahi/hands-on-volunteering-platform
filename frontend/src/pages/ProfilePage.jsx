import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ProfileEventCard from "../components/ProfileEventCard";
import EditProfileForm from "../components/EditProfileForm";
import { Link } from "react-router";
import DataErrorPage from "../components/DataErrorPage";

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

  if (error) {
    return <DataErrorPage />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full min-h-svh">
      <main className="mx-auto flex flex-col items-center justify-center h-full mt-8 px-4">
        <h1 className="text-3xl font-semibold border-b-2 border-black capitalize">
          Welcome,{user.name}
        </h1>

        <div className="flex items-start justify-center flex-col gap-10 my-10 w-full">
          {!isEditOpen ? (
            <div className="flex items-start justify-center flex-col gap-2 w-full">
              <p>Name: {data.name}</p>
              <p>Email: {data.email}</p>
              <p>Causes: {data.causes.join(", ")}</p>
              <p>Skills: {data.skills.join(", ")}</p>

              <button
                onClick={() => setIsEditOpen(true)}
                className="text-black text-sm font-semibold bg-accent hover:bg-secondary hover:text-white border-secondary border-2 cursor-pointer px-5 py-1 rounded-lg transition duration-300 ease-in-out"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            // Edit profile

            <EditProfileForm user={data} onClose={() => setIsEditOpen(false)} />
          )}

          <div>
            <h2 className="text-2xl font-semibold border-b-2 border-black w-full">
              Event History
            </h2>

            {/* cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full">
              {data.events.map((event) => (
                <ProfileEventCard event={event} key={event._id} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
