import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const generateAccessAndRefreshTokens = async (
  payload = {},
  duration = "1h"
) => {
  try {
    const access_token = await generateAccessToken(payload, duration);
    const refresh_token = await generateRefreshToken();
    return { access_token, refresh_token };
  } catch (error) {
    console.error(error);
    return new AuthError(
      "Error while generating access_token and refresh_token"
    );
  }
};

const generateAccessToken = async (
  payload = {},
  duration = "1h",
  audience = "TODO:",
  subject = "TODO:",
  issuer = "TODO:"
) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        algorithm: "HS256",
        expiresIn: duration,
        audience: audience,
        subject: subject,
        issuer: issuer,
      },
      (err, access_token) => {
        if (err) {
          console.error(err);
          reject(new Error("Error while generating access_token"));
        } else {
          resolve(access_token);
        }
      }
    );
  });
};

const generateRefreshToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(48, async (err, buffer) => {
      if (err) {
        console.error(err);
        reject(new AuthError("Error while generating refrsh_token"));
      } else {
        const refresh_token = buffer.toString("hex");
        resolve(refresh_token);
      }
    });
  });
};
export { generateAccessAndRefreshTokens, generateRefreshToken };
