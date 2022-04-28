// import { createPublicKey } from "crypto";
// import * as jose from "jose";

// export const EncryptPassword = async () => {
//   const algorithm = "ES256";
//   const pkcs8 = `-----BEGIN PRIVATE KEY-----
//     MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgiyvo0X+VQ0yIrOaN
//     nlrnUclopnvuuMfoc8HHly3505OhRANCAAQWUcdZ8uTSAsFuwtNy4KtsKqgeqYxg
//     l6kwL5D4N3pEGYGIDjV69Sw0zAt43480WqJv7HCL0mQnyqFmSrxj8jMa
//     -----END PRIVATE KEY-----`;
//   const ecPrivateKey = await jose.importPKCS8(pkcs8, algorithm);

//   const data = await new jose.SignJWT({ "urn:example:claim": true })
//     .setProtectedHeader({ alg: "ES256" })
//     .setIssuedAt()
//     .setIssuer("urn:example:issuer")
//     .setAudience("urn:example:audience")
//     .setExpirationTime("2h")
//     .sign(ecPrivateKey);

//   const PublicKey = createPublicKey("123456");

//   const jwe = await new jose.CompactEncrypt(
//     new TextEncoder().encode(
//       "It’s a dangerous business, Frodo, going out your door."
//     )
//   )
//     .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
//     .encrypt("");

//   console.log(
//     "this is ?? ",
//     data,
//     new TextEncoder().encode(
//       "It’s a dangerous business, Frodo, going out your door."
//     )
//   );
// };
