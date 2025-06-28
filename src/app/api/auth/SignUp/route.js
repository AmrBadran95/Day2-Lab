import { connectDB, disconnectDB } from "@/db/dbConnection";
import User from "@/models/User";

export async function POST(request) {
  const body = await request.json();

  await connectDB();

  const existingUser = await User.findOne({ email: body.email });

  if (existingUser) {
    await disconnectDB();
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 409,
    });
  }

  const newUser = new User(body);
  await newUser.save();

  await disconnectDB();

  return new Response(
    JSON.stringify({ message: "User created successfully" }),
    {
      status: 201,
    }
  );
}
