import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "../src/Pages/Home.tsx";
import { RecoilRoot } from "recoil";
import SignUp from "./Pages/SignUp.tsx";
import SignIn from "./Pages/SignIn.tsx";
import { Video } from "./Pages/Video.tsx";
import { Tweet } from "./Pages/Tweet.tsx";
import { Audio } from "./Pages/Audio.tsx";
import { Article } from "./Pages/Article.tsx";
import { Image } from "./Pages/Image.tsx";
function App() {
  return (
    <RecoilRoot>
      {/* <div className="bg-slate-100 h-screen">
        <Home />
      </div> */}
      {/* <SignUp /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/videos" element={<Video />} />
          <Route path="/tweets" element={<Tweet />} />
          <Route path="/audios" element={<Audio />} />
          <Route path="/articles" element={<Article />} />
          <Route path="/images" element={<Image />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
