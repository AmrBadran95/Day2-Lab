import { connectDB, disconnectDB } from "@/db/dbConnection";
import Task from "@/models/Task";
import TodoForm from "@/components/TodoForm";

export default async function TodoPage() {
  await connectDB();
  const tasks = await Task.find({});
  await disconnectDB();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Todo App</h1>
      <TodoForm />
      <ul className="mt-6 space-y-2">
        {tasks.map((task) => (
          <li key={task._id} className="text-lg">
            {task.taskName}
          </li>
        ))}
      </ul>
    </div>
  );
}
