import { CONFLICT } from "../constants/http";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import { refreshTokenSignOptions, signToken } from "../utils/jwt";

export type CreataAccountParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: CreataAccountParams) => {
  //verify existing user doesn't exist
  const existingUser = await UserModel.exists({
    email: data.email,
  });

  appAssert(!existingUser, CONFLICT, "Email already in use");

  //create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  const userId = user._id;

  //create session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent,
  });

  //sign refresh token
  const refreshToken = signToken(
    { sessionId: session._id },
    refreshTokenSignOptions
  );

  //access token
  const accessToken = signToken({ userId, sessionId: session._id });

  return { user: user.omitPassword(), accessToken, refreshToken };
};
