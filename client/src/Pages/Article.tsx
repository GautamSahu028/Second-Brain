import { Sidebar } from "../components/Sidebar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { contentAtom } from "../store/content.atom.tsx";
import axios from "axios";
import { BACKEND_URL } from "../config.tsx";
import { useEffect } from "react";
import { loadingAtom } from "../store/loading.atom.tsx";
import { loginAtom } from "../store/login.atom.tsx";
import { Loading } from "../components/Loading.tsx";
import { PleaseSignIn } from "../components/PleaseSignIn.tsx";
import Cards from "../components/Cards.tsx";

export function Article() {
  const data: {
    _id: string;
    link: string;
    type: string;
    title: string;
    tags: string[];
    date: string;
  }[] = useRecoilValue(contentAtom);
  const setData = useSetRecoilState(contentAtom);

  const loading = useRecoilValue(loadingAtom);
  const setLoading = useSetRecoilState(loadingAtom);

  const isLoggedIn = useRecoilValue(loginAtom);
  const setIsLoggedIn = useSetRecoilState(loginAtom);
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const getUsername = localStorage.getItem("username");

        if (accessToken && getUsername) {
          setIsLoggedIn(true); // User is logged in
        } else {
          setIsLoggedIn(false); // User is not logged in
        }

        const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            Authorization: accessToken,
          },
        });
        setData(response.data.data);
        const videoData = response.data.data.filter(
          (item: { type: string }) => item.type === "article"
        );
        setData(videoData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
    // console.log("data", data);
  }, [isLoggedIn, setData, setLoading]);

  return (
    <div className="flex h-full bg-slate-100">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        {/* Cards Section */}
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        ) : isLoggedIn ? (
          <Cards data={data} />
        ) : (
          <PleaseSignIn />
        )}
      </div>
    </div>
  );
}
