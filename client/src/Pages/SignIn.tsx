import { useForm } from "react-hook-form";
import axios from "axios";
import { BACKEND_URL, FRONTEND_URL } from "../config.tsx";
import { errorMsgAtom } from "../store/errorMsg.atom.tsx";
import { useRecoilValue, useSetRecoilState } from "recoil";

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

  const errorMessage = useRecoilValue(errorMsgAtom);
  const setErrorMessage = useSetRecoilState(errorMsgAtom);

  const onSubmit = async ({ username, password }: SignInData) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/sign-in`, {
        username: username,
        password: password,
      });

      const accessToken = response.data.data; // Extract JWT token
      if (!accessToken) {
        throw new Error("No token provided in the response.");
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", username);

      alert("Signed in successfully!");
      window.location.href = `${FRONTEND_URL}/`; // Redirect to home page
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorMessage("Invalid credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <form
        className="flex flex-col gap-6 bg-white border-1 border-gray-300 p-6 rounded-lg shadow-md w-72 max-w-80"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Sign In
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            className="border p-2 rounded w-full focus:ring-2 focus:ring-purple-600 outline-none"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="border p-2 rounded w-full focus:ring-2 focus:ring-purple-600 outline-none"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition w-full"
        >
          Submit
        </button>
        <p
          className="font-light text-blue-600 underline decoration-0 hover:cursor-pointer"
          onClick={() => (window.location.href = `${FRONTEND_URL}/sign-up`)}
        >
          sign up
        </p>
      </form>
    </div>
  );
};

export default SignIn;
