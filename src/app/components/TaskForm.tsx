import React, { FormEvent, useEffect, useState } from 'react';
import Task from './Task';

interface TaskFormProps {
  onSubmit: (task:Task)=>void;
  initialData?: Task;
}

const TaskForm : React.FC<TaskFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState(initialData?.status || 'Pending');

  useEffect(() => {
    setTitle(initialData?.title ?? '')
    setDescription(initialData?.description ?? '')
    setStatus(initialData?.status ?? 'Pending')
  }, [initialData])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ title, description, status });
    setTitle('');
    setDescription('');
    setStatus('Pending');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded-md p-2 mr-2"
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded-md p-2 mr-2"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded-md p-2 mr-2"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2">
        {initialData ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;