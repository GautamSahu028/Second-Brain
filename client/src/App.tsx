import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "../src/Pages/Home.tsx";
import { RecoilRoot } from "recoil";
import SignUp from "./Pages/SignUp.tsx";
import SignIn from "./Pages/SignIn.tsx";
function App() {
  return (
    <RecoilRoot>
      {/* <div className="bg-slate-100 h-screen">
        <Home />
      </div> */}
      {/* <SignUp /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
