import { useSetRecoilState } from "recoil";
import { modalAtom } from "../store/Modal.atom";
import { contentAtom } from "../store/content.atom";
import { FRONTEND_URL } from "../config";

export const useLogout = () => {
  const resetModal = useSetRecoilState(modalAtom);
  const resetContent = useSetRecoilState(contentAtom);

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");

    // Reset global states
    resetModal(false);
    resetContent([]);

    // Redirect to sign-in page
    window.location.href = `${FRONTEND_URL}/home`; // Adjust route as per your app
  };

  return logout;
};
