import { atom } from "recoil";
export const userNameAtom = atom<string | null>({
  key: "username",
  default: null,
});
