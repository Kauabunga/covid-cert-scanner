import { atom, selector, useRecoilValue } from "recoil";

const didState = atom({
  key: "didState", // unique ID (with respect to other atoms/selectors)
  default: {
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
  },
});

export const jwkSelector = selector({
  key: "jwkSelector",
  get: ({ get }) => {
    const did = get(didState);
    const { kty, crv, x, y } = did.verificationMethod[0].publicKeyJwk;
    return {
      kty,
      crv,
      x: Buffer.from(x, "base64"),
      y: Buffer.from(y, "base64"),
    };
  },
});

export const useDid = () => useRecoilValue(didState);
export const useJwk = () => useRecoilValue(jwkSelector);
