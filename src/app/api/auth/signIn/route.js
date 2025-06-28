import { connectDB, disconnectDB } from "@/db/dbConnection";
import User from "@/models/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;

  await connectDB();

  const user = await User.findOne({ email });

  if (!user) {
    await disconnectDB();
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    await disconnectDB();
    return new Response(JSON.stringify({ message: "Invalid password" }), {
      status: 401,
    });
  }

  const token = jwt.sign(
    { username: user.username, role: "user" },
    "todo-app",
    { expiresIn: "1d" }
  );

  await disconnectDB();
  return new Response(JSON.stringify({ token }), { status: 200 });
}
