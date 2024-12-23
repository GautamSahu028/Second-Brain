import { atom } from "recoil";
export const signInAtom = atom<boolean>({
  key: "login",
  default: true,
});
