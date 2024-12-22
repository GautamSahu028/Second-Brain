import { Logo } from "../icons/Logo.tsx";
import { TweetIcon } from "../icons/TweetIcon.tsx";
import { YoutubeIcon } from "../icons/YoutubeIcon.tsx";
import { SidebarItem } from "./SidebarItem.tsx";
import { LinkIcon } from "../icons/LinkIcon.tsx";
import { ArticleIcon } from "../icons/ArticleIcon.tsx";
import { UserIcon } from "../icons/UserIcon.tsx";

export function Sidebar() {
  return (
    <div className="h-screen bg-white border-r border-2 fixed left-0 top-0 w-16 md:w-64 flex flex-col justify-between">
      {/* Top Section: Logo and Items */}
      <div>
        {/* Logo */}
        <div className="md:pl-4 flex items-center justify-center md:justify-start text-xl md:text-3xl pt-4 font-bold md:space-x-2">
          <Logo />
          <span className="pl-2 hidden md:inline tracking-widest md:text-gray-700">
            Brainly
          </span>
        </div>

        {/* Sidebar Items */}
        <div className="pt-4">
          {/* Expanded view */}
          <div className="hidden md:block space-y-4 md:space-y-2 md:pl-4">
            <SidebarItem text="Tweets" icon={<TweetIcon size="md" />} />
            <SidebarItem text="Videos" icon={<YoutubeIcon size="md" />} />
            <SidebarItem text="Documents" icon={<ArticleIcon size="md" />} />
            <SidebarItem text="Links" icon={<LinkIcon size="md" />} />
          </div>

          {/* Collapsed view */}
          <div className="flex flex-col items-center space-y-2 mt-1 md:hidden">
            <div className="hover:bg-gray-100 cursor-pointer pl-5 py-2 rounded w-full text-gray-700">
              <TweetIcon size="md" />
            </div>
            <div className="hover:bg-gray-100 cursor-pointer pl-5 py-2 rounded w-full text-gray-700">
              <YoutubeIcon size="md" />
            </div>
            <div className="hover:bg-gray-100 cursor-pointer pl-5 py-2 rounded w-full text-gray-700">
              <ArticleIcon size="md" />
            </div>
            <div className="hover:bg-gray-100 cursor-pointer pl-5 py-2 rounded w-full text-gray-700">
              <LinkIcon size="md" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: User Icon */}
      <div className="mb-4 hidden md:block sm:pl-2 sm:font-semibold">
        <SidebarItem text="Welcome User" icon={<UserIcon size="lg" />} />
      </div>
      {/* Bottom Section: Collapsed User Icon */}
      <div className="flex flex-col items-center space-y-2 mt-1 md:hidden">
        <div className="hover:bg-gray-100 cursor-pointer pb-2 mb-2  rounded w-full text-gray-700">
          <SidebarItem text="Welcome User" icon={<UserIcon size="lg" />} />
        </div>
      </div>
    </div>
  );
}
