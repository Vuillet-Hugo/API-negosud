import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  if (!password) {
    throw new Error("Password is missing");
  }

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

export { hashPassword };
