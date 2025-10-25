// src/pages/Tasks.jsx
import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Tasks() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Task Manager
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Organize your tasks efficiently
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total Tasks</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.active}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Active Tasks</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Completed</p>
        </Card>
      </div>

      {/* Add Task Form */}
      <Card title="Add New Task">
        <form onSubmit={addTask} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" variant="primary">
            Add Task
          </Button>
        </form>
      </Card>

      {/* Filter Buttons */}
      <div className="flex gap-2 justify-center">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          onClick={() => setFilter('all')}
        >
          All ({stats.total})
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'secondary'}
          onClick={() => setFilter('active')}
        >
          Active ({stats.active})
        </Button>
        <Button
          variant={filter === 'completed' ? 'primary' : 'secondary'}
          onClick={() => setFilter('completed')}
        >
          Completed ({stats.completed})
        </Button>
      </div>

      {/* Tasks List */}
      <Card title={`${filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks`}>
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No tasks found. Add a new task to get started.
          </p>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg
                         hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 cursor-pointer"
                />
                <span
                  className={`flex-1 ${
                    task.completed
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {task.text}
                </span>
                <Button
                  variant="danger"
                  onClick={() => deleteTask(task.id)}
                  className="text-sm px-3 py-1"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}