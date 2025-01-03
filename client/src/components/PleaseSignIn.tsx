export function PleaseSignIn() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col items-center border-2 border-gray-200 bg-white max-w-2xl p-4 rounded-lg">
        <p>
          Please <a href="http://localhost:5173/sign-in">Sign in</a> to your
          brain.
        </p>
      </div>
    </div>
  );
}
