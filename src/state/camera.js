import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";

const cameraAllowedState = atom({
  key: "cameraAllowedState",
  default: getCameraAllowedState(),
});

const cameraAllowedSelector = selector({
  key: "cameraAllowedSelector",
  get: ({ get }) => {
    const cameraAllowed = get(cameraAllowedState);
    // Update local store

    window.localStorage.cameraAllowedSelector = true;

    return cameraAllowed;
  },
});

const cameraFacingState = atom({
  key: "cameraFacingState",
  default: getCameraFacingState(),
});

export const useCameraFacingState = () => useRecoilValue(cameraFacingState);
export const useSetCameraFacingState = () =>
  useSetRecoilState(cameraFacingState);

export const useCameraAllowedSelector = () =>
  useRecoilValue(cameraAllowedSelector);
export const useSetCameraAllowedState = () =>
  useSetRecoilState(cameraAllowedState);

function getCameraAllowedState() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.cameraAllowedSelector === "true";
}

function getCameraFacingState() {
  if (typeof window === "undefined") {
    return "environment";
  }

  return window.innerHeight < window.innerWidth ? "user" : "environment";
}
