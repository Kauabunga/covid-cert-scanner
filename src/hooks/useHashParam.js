import { parse } from "qs";

export function useHashParam(paramName) {
  if (typeof window === "undefined") {
    return null;
  }

  const hashString = String(window.location.hash).replace("#", "");
  const hashParams = parse(hashString);

  return hashParams[paramName];
}

export function clearHashParams() {
  history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search
  );
}
