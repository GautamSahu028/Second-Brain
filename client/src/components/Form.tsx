import { useForm } from "react-hook-form";
import axios from "axios";
import { BACKEND_URL } from "../config.tsx";
import { contentTypes } from "../config.tsx";

interface FormData {
  link: string;
  type: string;
  title: string;
  tags: string;
  date: string;
  desc: string;
}
export function Form() {
  const {
    register,
    handleSubmit,
    // @ts-ignore
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async ({ link, type, title, tags, desc }: FormData) => {
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage
      if (!token) {
        throw new Error("User is not authenticated");
      }
      // @ts-ignore
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          type: type,
          link: link,
          title: title,
          tags: tags.split(",").map((tag) => tag.trim()),
          date: new Date().toLocaleString(),
          desc: desc,
        },
        {
          headers: {
            Authorization: token, // Add token in Authorization header
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error adding content:", error);
      alert("Failed to add content. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Add New Content</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray-700">Link</label>
          <input
            type="text"
            placeholder="Enter content link"
            className="border p-2 rounded w-full"
            {...register("link", { required: true })}
          />
        </div>

        <div>
          <label className="block text-gray-700">Type</label>
          <select
            className="border p-2 rounded w-full"
            {...register("type", { required: true })}
          >
            <option value="">Select type</option>
            {contentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Enter content title"
            className="border p-2 rounded w-full"
            {...register("title", { required: true })}
          />
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            placeholder="Enter Description"
            className="border p-2 rounded w-full"
            {...register("desc", { required: true })}
          />
        </div>

        <div>
          <label className="block text-gray-700">Tags (comma separated)</label>
          <input
            type="text"
            placeholder="Enter tags"
            className="border p-2 rounded w-full"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="mt-6 flex justify-center">
          <input
            type="submit"
            className="bg-purple-600 text-white py-3 px-6 rounded-lg flex items-center font-light justify-center w-full cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
