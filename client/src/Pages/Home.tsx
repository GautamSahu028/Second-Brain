import Button from "../components/Button.tsx";
import { Sidebar } from "../components/Sidebar";
import { PLusIcon } from "../icons/PLusIcon";
import { ShareIcon } from "../icons/ShareIcon";
// import { data } from "../data.tsx";
import { Card } from "../components/Card.tsx";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modalAtom } from "../store/Modal.atom.tsx";
import { Modal } from "../components/Modal.tsx";
import { contentAtom } from "../store/content.atom.tsx";
import axios from "axios";
import { BACKEND_URL } from "../config.tsx";
import { useEffect } from "react";
import { loadingAtom } from "../store/loading.atom.tsx";
import { loginAtom } from "../store/login.atom.tsx";
import { useLogout } from "../utils/useLogout.tsx";
import SignIn from "./SignIn.tsx";
import { Loading } from "../components/Loading.tsx";
import SignUp from "./SignUp.tsx";
import { signInAtom } from "../store/signIn.atom.tsx";

export function Home() {
  const isOpen = useRecoilValue(modalAtom);
  const setIsOpen = useSetRecoilState(modalAtom);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const data = useRecoilValue(contentAtom);
  const setData = useSetRecoilState(contentAtom);

  const loading = useRecoilValue(loadingAtom);
  const setLoading = useSetRecoilState(loadingAtom);

  const isLoggedIn = useRecoilValue(loginAtom);
  const setIsLoggedIn = useSetRecoilState(loginAtom);

  const signIn = useRecoilValue(signInAtom);

  const logout = useLogout();

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
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [isLoggedIn, setData, setLoading]);

  return (
    <div className="flex h-full bg-slate-100">
      <Modal open={isOpen} onClose={closeModal} />
      <Sidebar />
      <div className="flex-grow flex flex-col bg-slate-100">
        {/* Top Buttons */}
        <div className="flex justify-end p-4 space-x-4">
          <Button
            variant="primary"
            size="md"
            startIcon={<PLusIcon size="md" />}
            onClick={openModal}
            text="Add Cells"
          />
          <Button
            variant="secondary"
            size="md"
            startIcon={<ShareIcon size="md" />}
            onClick={() => console.log("Share Brain")}
            text="Share Brain"
          />
        </div>

        {/* Cards Section */}
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loading />
          </div>
        ) : isLoggedIn ? (
          <div className="flex md:flex-wrap md:flex-row flex-col justify-center gap-x-4 gap-y-4 pl-20 md:pl-72 mr-18">
            {data && data.length > 0 ? (
              data.map(({ link, type, title, tags, _id }) => (
                <Card
                  key={_id}
                  link={link}
                  type={type}
                  title={title}
                  tags={tags}
                  addedDate={new Date().toLocaleString()}
                />
              ))
            ) : (
              <div className="flex justify-center items-center h-screen w-full">
                <p>Add Memory</p>
              </div>
            )}
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </div>
  );
}
