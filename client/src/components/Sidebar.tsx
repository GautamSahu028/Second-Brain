import { Logo } from "../icons/Logo.tsx";
import { TweetIcon } from "../icons/TweetIcon.tsx";
import { YoutubeIcon } from "../icons/YoutubeIcon.tsx";
import { SidebarItem } from "./SidebarItem.tsx";
import { ArticleIcon } from "../icons/ArticleIcon.tsx";
import { UserIcon } from "../icons/UserIcon.tsx";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userNameAtom } from "../store/username.atom.tsx";
import { useEffect } from "react";
import { useLogout } from "../utils/useLogout.tsx";
import { ImageIcon } from "../icons/ImageIcon.tsx";
import { AudioIcon } from "../icons/AudioIcon.tsx";
import { FRONTEND_URL } from "../config.tsx";

export function Sidebar() {
  const userName = useRecoilValue(userNameAtom);
  const setUserName = useSetRecoilState(userNameAtom);

  const logout = useLogout();

  useEffect(() => {
    const getUsername = localStorage.getItem("username");
    if (getUsername && getUsername !== userName) {
      setUserName(getUsername);
    }
  }, [userName]); // Only run once on mount

  console.log(userName);

  return (
    <div className="h-screen bg-white border-r border-2 fixed left-0 top-0 w-16 md:w-64 flex flex-col justify-between">
      {/* Top Section: Logo and Items */}
      <div>
        {/* Logo */}
        <div
          className="md:pl-4 flex items-center justify-center md:justify-start text-xl md:text-3xl pt-4 font-bold md:space-x-2 hover:cursor-pointer"
          onClick={() => {
            window.location.href = `${FRONTEND_URL}/`;
          }}
        >
          <Logo />
          <span className="pl-2 hidden md:inline tracking-widest md:text-gray-700">
            Brainly
          </span>
        </div>

        {/* Sidebar Items */}
        <div className="pt-4">
          {/* Expanded view */}
          <div className="hidden sm:block space-y-4 md:space-y-2 md:pl-4">
            <SidebarItem
              text="Tweets"
              icon={<TweetIcon size="md" />}
              onClick={() => {
                window.location.href = `${FRONTEND_URL}/tweets`;
              }}
            />
            <SidebarItem
              text="Videos"
              icon={<YoutubeIcon size="md" />}
              onClick={() => {
                window.location.href = `${FRONTEND_URL}/videos`;
              }}
            />
            <SidebarItem
              text="Articles"
              icon={<ArticleIcon size="md" />}
              onClick={() => {
                window.location.href = `${FRONTEND_URL}/articles`;
              }}
            />
            <SidebarItem
              text="Images"
              icon={<ImageIcon size="md" />}
              onClick={() => {
                window.location.href = `${FRONTEND_URL}/images`;
              }}
            />
            <SidebarItem
              text="Audio"
              icon={<AudioIcon size="md" />}
              onClick={() => {
                window.location.href = `${FRONTEND_URL}/audios`;
              }}
            />
          </div>

          {/* Collapsed view */}
          <div className="flex flex-col items-center space-y-2 mt-1 sm:hidden">
            <div
              className="hover:bg-gray-100 cursor-pointer pl-5 py-2 rounded w-full text-gray-700"
              onClick={() => {
                window.location.href = `${FRONTEND_URL}/tweets`;
              }}
            >
              <TweetIcon size="md" />
            </div>
            <div
              className="hover:bg-gray-100 cursor-pointer pl-5 py-2 rounded w-full text-gray-700"
              onClick={() => {
                window.location.href = `${FRONTEND_URL}/videos`;
              }}
            >
              <YoutubeIcon size="md" />
            </div>
            <div
              className="hover:bg-gray-100 cursor-pointer pl-5 py-2 rounded w-full text-gray-700"
              onClick={() => {
                window.location.href = `${FRONTEND_URL}/articles`;
              }}
            >
              <ArticleIcon size="md" />
            </div>
            <div
              className="hover:bg-gray-100 cursor-pointer pl-5 py-2 rounded w-full text-gray-700"
              onClick={() => {
                window.location.href = `${FRONTEND_URL}/images`;
              }}
            >
              <ImageIcon size="md" />
            </div>
            <div
              className="hover:bg-gray-100 cursor-pointer pl-5 py-2 rounded w-full text-gray-700"
              onClick={() => {
                window.location.href = `${FRONTEND_URL}/audios`;
              }}
            >
              <AudioIcon size="md" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: User Icon */}
      <div
        className="mb-4 hidden md:block sm:pl-2 sm:font-semibold"
        onClick={logout}
      >
        <SidebarItem
          text={userName ? `Hii ${userName}` : "Sign-in"}
          icon={<UserIcon size="lg" />}
        />
      </div>
      {/* Bottom Section: Collapsed User Icon */}
      <div
        className="flex flex-col items-center space-y-2 mt-1 md:hidden"
        onClick={logout}
      >
        <div className="hover:bg-gray-100 cursor-pointer pb-2 mb-2 rounded w-full text-gray-700">
          <SidebarItem
            text={userName ? `Hii ${userName}` : "Sign-in"}
            icon={<UserIcon size="lg" />}
          />
        </div>
      </div>
    </div>
  );
}
