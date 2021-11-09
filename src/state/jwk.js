import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";

const didState = atom({
  key: "didState",
  default: getNzJwk(),
});

export const verificationSelector = selector({
  key: "verificationSelector",
  get: ({ get }) => {
    const did = get(didState);
    return transformDidToVerificationMethod(did);
  },
});

export const verificationIdSelector = selector({
  key: "verificationIdSelector",
  get: ({ get }) => {
    const verificationMethod = get(verificationSelector);
    return verificationMethod.id;
  },
});
export const verificationControllerSelector = selector({
  key: "verificationControllerSelector",
  get: ({ get }) => {
    const verificationMethod = get(verificationSelector);
    return verificationMethod.controller;
  },
});

export const jwkSelector = selector({
  key: "jwkSelector",
  get: ({ get }) => {
    const verificationMethod = get(verificationSelector);
    const { kty, crv, x, y } = verificationMethod.publicKeyJwk;
    return {
      kty,
      crv,
      x: Buffer.from(x, "base64"),
      y: Buffer.from(y, "base64"),
    };
  },
});

export const useSetJwk = () => useSetRecoilState(didState);
export const useExampleJwkId = () =>
  transformDidToVerificationMethod(getExampleJwk()).id;
export const useNzJwkId = () => transformDidToVerificationMethod(getNzJwk()).id;
export const useJwkId = () => useRecoilValue(verificationIdSelector);

export const useDid = () => useRecoilValue(didState);
export const useJwk = () => useRecoilValue(jwkSelector);

function transformDidToVerificationMethod(did) {
  return did.verificationMethod[0];
}

export function getExampleJwk() {
  return {
    "@context": "https://w3.org/ns/did/v1",
    id: "did:web:nzcp.covid19.health.nz",
    verificationMethod: [
      {
        id: "did:web:nzcp.covid19.health.nz#key-1",
        controller: "did:web:nzcp.covid19.health.nz",
        type: "JsonWebKey2020",
        publicKeyJwk: {
          kty: "EC",
          crv: "P-256",
          x: "zRR-XGsCp12Vvbgui4DD6O6cqmhfPuXMhi1OxPl8760",
          y: "Iv5SU6FuW-TRYh5_GOrJlcV_gpF_GpFQhCOD8LSk3T0",
        },
      },
    ],
    assertionMethod: ["did:web:nzcp.covid19.health.nz#key-1"],
  };
}

export function getNzJwk() {
  return {
    "@context": [
      "https://w3.org/ns/did/v1",
      "https://w3id.org/security/suites/jws-2020/v1",
    ],
    id: "did:web:nzcp.identity.health.nz",
    verificationMethod: [
      {
        id: "did:web:nzcp.identity.health.nz#z12Kf7UQ",
        controller: "did:web:nzcp.identity.health.nz",
        type: "JsonWebKey2020",
        publicKeyJwk: {
          kty: "EC",
          crv: "P-256",
          x: "DQCKJusqMsT0u7CjpmhjVGkHln3A3fS-ayeH4Nu52tc",
          y: "lxgWzsLtVI8fqZmTPPo9nZ-kzGs7w7XO8-rUU68OxmI",
        },
      },
    ],
    assertionMethod: ["did:web:nzcp.identity.health.nz#z12Kf7UQ"],
  };
}
