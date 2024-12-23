import { atom } from "recoil";
export const errorMsgAtom = atom<string | null>({
  key: "errorMsg",
  default: null,
});
