import randomstring from "randomstring";
import { SHA256 } from "crypto-js";
import encBase64 from "crypto-js/enc-base64";

const createHash = (salt: string, password: string) => {
  return SHA256(password + salt).toString(encBase64);
};

export default {
  generate(password: string) {
    const salt = randomstring.generate(64);
    const token = randomstring.generate(64);
    const hash = createHash(salt, password);
    return { salt, token, hash };
  },
  isCorrectPassword(password: string, salt: string, hash: string) {
    return createHash(salt, password) === hash;
  },
};
