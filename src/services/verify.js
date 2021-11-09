import cose from "cose-js";
import cbor from "cbor";
import * as base32 from "hi-base32";

const NZCP_PREFIX = "NZCP:";
const VERSION_PREFIX = "1";

export async function verify(code, iss, jwk) {
  if (!jwk || !code) {
    return null;
  }

  const [nzcpPrefix, versionPrefix, encodedToken] = String(code).split("/");

  const isValidNzcpPrefix = nzcpPrefix === NZCP_PREFIX;
  const isValidVersionPrefix = versionPrefix === VERSION_PREFIX;
  if (!isValidNzcpPrefix || !isValidVersionPrefix) {
    return { error: "Invalid token prefix", code };
  }

  try {
    const COSEMessage = Buffer.from(base32.decode.asBytes(encodedToken));
    const verifiedBuffer = await cose.sign.verify(COSEMessage, { key: jwk });
    const tokenMap = await decode(verifiedBuffer);
    const decoded = transformDecodedMap(tokenMap);

    const now = Date.now();

    if (decoded.iss !== iss) {
      return { error: "Invalid Issuer", decoded };
    }

    if (decoded.nbf * 1000 > now) {
      return { error: "NBF Invalid", decoded };
    }

    if (decoded.exp * 1000 < now) {
      return { error: "Expired", decoded };
    }

    console.log("Decoded", decoded);
    return decoded;
  } catch (err) {
    console.error("Error verifying token", err);
    return { error: err.message, code };
  }
}

async function decode(buffer) {
  return new Promise((resolve, reject) =>
    cbor.decodeFirst(buffer, (err, obj) => (err ? reject(err) : resolve(obj)))
  );
}

function transformDecodedMap(tokenMap) {
  return {
    iss: tokenMap.get(1),
    nbf: tokenMap.get(5),
    exp: tokenMap.get(4),
    jti: ["urn:uuid", tokenMap.get(7).toString("hex")].join(""),
    vc: tokenMap.get("vc"),
  };
}
