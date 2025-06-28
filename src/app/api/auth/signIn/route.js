import { connectDB, disconnectDB } from "@/db/dbConnection";
import User from "@/models/User";

import * as bc from "bcryptjs";
import * as jwt from "jsonwebtoken";

export async function POST(request) {
  const body = await request.json();

  console.log({ attemptingLogin: body });

  await connectDB();

  const user = await User.findOne({ email: body.email });

  if (!user) {
    return Response.json(
      {
        message: "No account found with the provided email.",
      },
      { status: 404 }
    );
  }

  const isMatched = await bc.compare(body.password, user.password);

  if (isMatched) {
    const payload = {
      username: user.username,
      role: "user",
    };

    const token = jwt.sign(payload, "todo-app", { expiresIn: "1d" });

    return Response.json(
      {
        message: "Authentication successful.",
        token: token,
      },
      { status: 200 }
    );
  }

  await disconnectDB();

  return Response.json(
    {
      message: "Invalid email or password. Please try again.",
    },
    { status: 401 }
  );
}
