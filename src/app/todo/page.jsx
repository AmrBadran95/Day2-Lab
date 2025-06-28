import { connectDB, disconnectDB } from "@/db/dbConnection";
import Task from "@/models/Task";
import TodoForm from "@/components/TodoForm";

export default async function TodoPage() {
  await connectDB();
  const tasks = await Task.find().lean();
  await disconnectDB();

  return (
    <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-cyan-600 text-center">Todo App</h1>

      <TodoForm />

      <div>
        <h2 className="text-xl font-semibold mt-8 mb-4">Your Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks found.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1 text-gray-800">
            {tasks.map((task) => (
              <li key={task._id}>{task.taskName}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
