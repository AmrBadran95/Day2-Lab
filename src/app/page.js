import { connectDB, disconnectDB } from "@/db/dbConnection";
import Task from "@/models/Task";
import * as z from "zod/v4";

const todoSchema = z.object({
  taskName: z.string().min(3).max(20),
  description: z.string().optional(),
});

async function getTodos() {
  const tasks = await Task.find({});
  return tasks;
}

export default async function Home() {
  await connectDB();
  const tasks = await getTodos();
  await disconnectDB();

  async function createTodo(formData) {
    "use server";

    const taskName = formData.get("task_name");
    const description = formData.get("description");

    const newTask = {
      taskName,
      description,
    };

    try {
      const taskValues = await todoSchema.parseAsync(newTask);
      await connectDB();

      const task = new Task(taskValues);
      await task.save();

      await disconnectDB();

      console.log(taskValues);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-extrabold text-cyan-600 mb-8">Todo App</h1>

      <form action={createTodo} className="w-full max-w-xl space-y-6">
        <div className="flex flex-col">
          <label
            htmlFor="task_name"
            className="mb-2 text-lg font-medium text-gray-700">
            Task:
          </label>
          <input
            required
            id="task_name"
            name="task_name"
            placeholder="Enter your Task"
            type="text"
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="mb-2 text-lg font-medium text-gray-700">
            Description:
          </label>
          <input
            id="description"
            name="description"
            placeholder="Enter your Description"
            type="text"
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-md py-3 text-lg transition-colors">
            Submit
          </button>
        </div>
      </form>

      <div className="flex flex-col gap-2 mt-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Tasks</h2>
        <ul className="list-disc pl-6 space-y-2">
          {tasks.map((task) => (
            <li key={task._id?.toString()} className="text-lg text-gray-800">
              {task.taskName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
