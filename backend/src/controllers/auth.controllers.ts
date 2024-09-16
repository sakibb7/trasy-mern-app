import { CREATED } from "../constants/http";
import { createAccount } from "../services/auth.services";
import catchErrors from "../utils/catchErrors";
import { registerSchema } from "./auth.schemas";

export const registerHandler = catchErrors(async (req, res) => {
  console.log(`request body ${req.body}`);
  console.log(`request headers ${req.headers}`);
  //validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  console.log(`request ${request}`);

  //call service
  const { user } = await createAccount(request);

  return res.status(CREATED).json(user);
});
