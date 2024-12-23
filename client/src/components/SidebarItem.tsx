import { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  size?: string;
}

export function SidebarItem({ text, icon, size }: SidebarItemProps) {
  return (
    <div className="flex items-center text-gray-700 hover:bg-gray-100 cursor-pointer px-4 rounded w-full md:max-w-52 md:space-x-4">
      <div className="pr-2 md:visible">{icon}</div>
      <div className={`text-lg hidden md:inline text-${size}`}>{text}</div>
    </div>
  );
}
