import { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
  onClick
}: {
  text: string;
  icon: ReactElement;
  onClick?: () => void;
}) {
  return (
    <div className="flex items-center text-gray-700 hover:bg-gray-100 cursor-pointer px-4 rounded w-full md:max-w-52 md:space-x-4" onClick={onClick}>
      <div className="pr-2 md:visible">{icon}</div>
      <div className="text-lg hidden md:inline">{text}</div>
    </div>
  );
}
