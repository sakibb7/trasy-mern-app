import { RequestHandler } from "express";
import appAssert from "../utils/appAssert";
import { UNAUTHORIZED } from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  console.log(`Cookies => ${req.cookies}`);

  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Not Authorized",
    AppErrorCode.InvalidAccessToken
  );

  const { error, payload } = verifyToken(accessToken);

  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    AppErrorCode.InvalidAccessToken
  );

  req.userId = (payload as JwtPayload).userId;
  req.sessionId = (payload as JwtPayload).sessionId;

  next();
};

export default authenticate;
