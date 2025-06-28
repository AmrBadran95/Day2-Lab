import { connectDB, disconnectDB } from "@/db/dbConnection";
import Task from "@/models/Task";
import * as z from "zod";

const todoSchema = z.object({
  taskName: z.string().min(3).max(20),
  description: z.string().optional(),
});

export async function POST(req) {
  const body = await req.json();
  try {
    const data = todoSchema.parse(body);
    await connectDB();
    const newTask = new Task(data);
    await newTask.save();
    await disconnectDB();
    return Response.json({ message: "Task created", task: newTask });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Failed to create task" }, { status: 400 });
  }
}
