import { useForm } from "react-hook-form";
import axios from "axios";
import { BACKEND_URL } from "../config.tsx";

interface SignInData {
  username: string;
  password: string;
}
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>();

  const onSubmit = async ({ username, password }: SignInData) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/sign-in`, {
        username: username,
        password: password,
      });

      // Extract the JWT token from the headers or response (depending on backend implementation)
      const accessToken = response.data.data; // Extract JWT from headers
      if (!accessToken) {
        throw new Error("No token provided in the response.");
      }

      // Store the JWT token in localStorage
      localStorage.setItem("accessToken", accessToken);

      alert("Signed in successfully!");
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Failed to sign in. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="flex flex-col gap-4 border-2 p-8 rounded-lg w-80"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            placeholder="Enter content link"
            className="border p-2 rounded w-full"
            {...register("username", { required: true })}
          />
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="text"
            placeholder="Enter content title"
            className="border p-2 rounded w-full"
            {...register("password", { required: true })}
          />
        </div>

        <div className="mt-4 flex justify-center">
          <input
            type="submit"
            className="bg-purple-600 text-white py-3 px-6 rounded-lg flex items-center font-light justify-center w-full cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
