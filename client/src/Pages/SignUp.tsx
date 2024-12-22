import { useForm } from "react-hook-form";
import axios from "axios";
import { BACKEND_URL } from "../config.tsx";

interface SignUpData {
  username: string;
  password: string;
}
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>();

  const onSubmit = async ({ username, password }: SignUpData) => {
    await axios.post(`${BACKEND_URL}/api/v1/sign-up`, {
      username: username,
      password: password,
    });
    alert("Signed up successfully!");
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

export default SignUp;
