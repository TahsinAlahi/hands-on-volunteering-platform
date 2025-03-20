import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

function EditProfileForm({ user, onClose }) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    skills: user.skills.join(", ") || "",
    causes: user.causes.join(", ") || "",
  });

  const axiosPrivate = useAxiosSecure();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      return await axiosPrivate.patch(`/users/${user._id}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", user._id]);
      onClose();
    },
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      causes: formData.causes.split(",").map((cause) => cause.trim()),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md"
    >
      <label className="flex flex-col">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </label>

      <label className="flex flex-col">
        Skills (comma separated):
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </label>

      <label className="flex flex-col">
        Causes (comma separated):
        <input
          type="text"
          name="causes"
          value={formData.causes}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          className="text-black hover:text-white cursor-pointer bg-accent hover:bg-secondary px-5 py-2 rounded-lg transition duration-300 ease-in-out"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-black hover:text-white bg-gray-300 hover:bg-secondary px-5 py-2 rounded-lg transition duration-300 ease-in-out cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditProfileForm;
