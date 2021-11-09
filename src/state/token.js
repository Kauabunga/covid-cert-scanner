import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import cose from "cose-js";
import cbor from "cbor";
import * as base32 from "hi-base32";

import { jwkSelector } from "./jwk";

const NZCP_PREFIX = "NZCP:";
const VERSION_PREFIX = "1";

const codeState = atom({
  key: "codeState",
  default: null,
});

const tokenSelector = selector({
  key: "tokenSelector",
  get: async ({ get }) => {
    const code = get(codeState);
    const jwk = get(jwkSelector);

    return verify(code, jwk).catch((err) => {
      console.error("Error verifying token", err);
      return null;
    });
  },
});

export const useCode = () => useRecoilValue(codeState);
export const useSetCode = () => useSetRecoilState(codeState);
export const useToken = () => useRecoilValue(tokenSelector);

async function verify(code, jwk) {
  if (!code || !jwk) {
    return null;
  }

  const [nzcpPrefix, versionPrefix, encodedToken] = code.split("/");

  const isValidNzcpPrefix = nzcpPrefix === NZCP_PREFIX;
  const isValidVersionPrefix = versionPrefix === VERSION_PREFIX;
  if (!isValidNzcpPrefix || !isValidVersionPrefix) {
    throw new Error("Invalid token");
  }

  const COSEMessage = Buffer.from(base32.decode.asBytes(encodedToken));
  const verifiedBuffer = await cose.sign.verify(COSEMessage, { key: jwk });
  const tokenMap = await decode(verifiedBuffer);

  return {
    iss: tokenMap.get(1),
    nbf: tokenMap.get(5),
    exp: tokenMap.get(4),
    jti: ["urn:uuid", tokenMap.get(7).toString("hex")].join(""),
    vc: tokenMap.get("vc"),
  };
}

async function decode(buffer) {
  return new Promise((resolve, reject) =>
    cbor.decodeFirst(buffer, (err, obj) => (err ? reject(err) : resolve(obj)))
  );
}

function getExampleToken() {
  return "NZCP:/1/2KCEVIQEIVVWK6JNGEASNICZAEP2KALYDZSGSZB2O5SWEOTOPJRXALTDN53GSZBRHEXGQZLBNR2GQLTOPICRUYMBTIFAIGTUKBAAUYTWMOSGQQDDN5XHIZLYOSBHQJTIOR2HA4Z2F4XXO53XFZ3TGLTPOJTS6MRQGE4C6Y3SMVSGK3TUNFQWY4ZPOYYXQKTIOR2HA4Z2F4XW46TDOAXGG33WNFSDCOJONBSWC3DUNAXG46RPMNXW45DFPB2HGL3WGFTXMZLSONUW63TFGEXDALRQMR2HS4DFQJ2FMZLSNFTGSYLCNRSUG4TFMRSW45DJMFWG6UDVMJWGSY2DN53GSZCQMFZXG4LDOJSWIZLOORUWC3CTOVRGUZLDOSRWSZ3JOZSW4TTBNVSWISTBMNVWUZTBNVUWY6KOMFWWKZ2TOBQXE4TPO5RWI33CNIYTSNRQFUYDILJRGYDVAYFE6VGU4MCDGK7DHLLYWHVPUS2YIDJOA6Y524TD3AZRM263WTY2BE4DPKIF27WKF3UDNNVSVWRDYIYVJ65IRJJJ6Z25M2DO4YZLBHWFQGVQR5ZLIWEQJOZTS3IQ7JTNCFDX";
}
