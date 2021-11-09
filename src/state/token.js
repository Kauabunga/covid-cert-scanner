import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";

import { verify } from "../services/verify";
import { jwkSelector, verificationControllerSelector } from "./jwk";

const codeState = atom({
  key: "codeState",
  default: null,
});

const tokenSelector = selector({
  key: "tokenSelector",
  get: async ({ get }) => {
    const code = get(codeState);
    const iss = get(verificationControllerSelector);
    const jwk = get(jwkSelector);

    return verify(code, iss, jwk).catch((err) => {
      console.error("Error verifying token", err);
      return null;
    });
  },
});

export const useCode = () => useRecoilValue(codeState);
export const useSetCode = () => useSetRecoilState(codeState);
export const useToken = () => useRecoilValue(tokenSelector);
