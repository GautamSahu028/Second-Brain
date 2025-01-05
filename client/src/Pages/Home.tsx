import Button from "../components/Button.tsx";
import { Sidebar } from "../components/Sidebar";
import { PLusIcon } from "../icons/PLusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modalAtom } from "../store/Modal.atom.tsx";
import { Modal } from "../components/Modal.tsx";
import { contentAtom } from "../store/content.atom.tsx";
import axios from "axios";
import { BACKEND_URL } from "../config.tsx";
import { useEffect } from "react";
import { loadingAtom } from "../store/loading.atom.tsx";
import { loginAtom } from "../store/login.atom.tsx";
import { Loading } from "../components/Loading.tsx";
import { PleaseSignIn } from "../components/PleaseSignIn.tsx";
import Cards from "../components/Cards.tsx";

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
    console.log("data :", data);
  }, [isLoggedIn, setData, setLoading]);

  const handleShare = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/share`,
        { share: true }, // Body
        {
          headers: {
            Authorization: accessToken, // Headers
          },
        }
      );
      navigator.clipboard.writeText(response.data.data.link);
      alert("Link copied to clipboard!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error sharing:", error.response?.data || error.message);
      } else {
        console.error("Error sharing:", error);
      }
    }
  };

  return (
    <div className="flex h-full bg-slate-100">
      <Modal open={isOpen} onClose={closeModal} />
      <Sidebar />
      <div className="flex-grow flex flex-col">
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
            onClick={handleShare}
            text="Share Brain"
          />
        </div>

        {/* Cards Section */}
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        ) : isLoggedIn ? (
          <div className="flex-grow overflow-auto bg-slate-100">
            <Cards data={data} />
          </div>
        ) : (
          <PleaseSignIn />
        )}
      </div>
    </div>
  );
}
