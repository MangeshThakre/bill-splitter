const crypto = require("crypto");

// TODO
function validPassword(hash, salt, password) {
  // pbkdf2Sfyc is password-base-crypotography method
  // 1000  iteration count  (minimum iteration count 1,000) (highest 10,000,000)
  // 64 bit
  //   sha512 is (Secure Hash Algorithm 512)
  //   for more information https://www.rfc-editor.org/rfc/rfc8018#section-5.2

  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  // console.log(hashVerify);
  // console.log(hash);
  return hashVerify === hash;
}

function genPassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const generateHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return {
    hash: generateHash,
    salt,
  };
}

module.exports = { genPassword, validPassword };
