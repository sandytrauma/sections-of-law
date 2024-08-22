"use client";
import { useEffect, useState } from 'react';

interface ToDoItem {
  id: number;
  content: string;
}

const ToDo: React.FC = () => {
  const [tasks, setTasks] = useState<ToDoItem[]>([]);
  const [input, setInput] = useState('');

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    // Retrieve tasks from localStorage
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        // Parse and set tasks
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error('Failed to parse tasks from localStorage', e);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  }, [tasks]);

  // Function to add a new task
  const addTask = () => {
    if (input.trim()) {
      // Add new task
      setTasks([...tasks, { id: Date.now(), content: input }]);
      setInput('');
    }
  };

  // Function to handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Function to handle task removal
  const removeTask = (id: number) => {
    // Remove task by filtering out the one with the matching id
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-center mt-5 text-gray-300 text-2xl md:text-3xl font-mono font-extrabold">To Do List</h1>
      <input
        type="text"
        placeholder="Add a new task..."
        value={input}
        onChange={handleInputChange}
        className="border p-2 mb-2 w-full rounded text-black focus:bg-teal-300"
      />
      <button
        onClick={addTask}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
      <ul className="mt-4">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task.id} className="border p-2 mb-2 rounded relative">
              {task.content}
              <button
                onClick={() => removeTask(task.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </li>
          ))
        ) : (
          <li>No tasks available.</li>
        )}
      </ul>
    </div>
  );
};

export default ToDo;
