import { connectDB, disconnectDB } from "@/db/dbConnection";
import User from "@/models/User";

export async function POST(request) {
  try {
    const body = await request.json();

    console.log({ registeringUser: body });

    if (!body.email || !body.username || !body.password) {
      return Response.json(
        { message: "Email, username, and password are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email: body.email });

    if (existingUser) {
      return Response.json(
        { message: "User already exists with this email." },
        { status: 409 }
      );
    }

    const newUser = new User(body);
    await newUser.save();

    return Response.json(
      { message: "User registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  } finally {
    await disconnectDB();
  }
}
