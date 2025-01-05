import { useRecoilValue, useSetRecoilState } from "recoil";
import { contentAtom } from "../store/content.atom.tsx";
import axios from "axios";
import { BACKEND_URL } from "../config.tsx";
import { useEffect } from "react";
import { loadingAtom } from "../store/loading.atom.tsx";
import { Loading } from "../components/Loading.tsx";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { userNameAtom } from "../store/username.atom";
import { Logo } from "../icons/Logo.tsx";

interface DataProps {
  _id: string;
  link: string;
  type: string;
  title: string;
  tags: string[];
  date: string;
}
export function ShareableContent() {
  const data: DataProps[] = useRecoilValue(contentAtom);
  const setData = useSetRecoilState(contentAtom);

  const loading = useRecoilValue(loadingAtom);
  const setLoading = useSetRecoilState(loadingAtom);

  const userName = useRecoilValue(userNameAtom);
  const setUserName = useSetRecoilState(userNameAtom);

  const { shareLink } = useParams<{ shareLink: string }>();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/brain/${shareLink}`
        );
        const userData = response.data.data.content;
        const userName = response.data.data.username;
        setData(userData);
        setUserName(userName);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
    // console.log("data", data);
  }, [setData, setLoading]);

  return (
    <div className="flex h-full bg-slate-100">
      <div className="flex-grow flex flex-col">
        <div className="flex justify-center items-center pt-8 space-x-2 font-bold">
          <Logo />
          <div className="tracking-wide text-2xl text-gray-600">
            <p>{userName}'s Brain</p>
          </div>
        </div>

        <hr className="w-96 h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-700"></hr>

        {/* Cards Section */}
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        ) : (
          <div className="flex-grow overflow-auto bg-slate-100">
            <div className="h-screen">
              <div className="flex md:flex-wrap md:flex-row flex-col align-center gap-x-4 gap-y-4 mr-18 mt-4 items-center sm:justify-around p-8">
                {data && data.length > 0 ? (
                  // @ts-ignore
                  data.map(({ _id, link, type, title, tags, date, desc }) => (
                    <Card
                      key={_id}
                      contentId={_id}
                      link={link}
                      type={type}
                      title={title}
                      tags={tags}
                      addedDate={date}
                      desc={desc}
                    />
                  ))
                ) : (
                  <div className="flex justify-center items-center h-screen w-full">
                    <p>Add Memory</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
