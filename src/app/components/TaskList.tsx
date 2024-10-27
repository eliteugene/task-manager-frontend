import React from 'react';
import Task from './Task';

interface TaskListProps {
  tasks: Array<Task>;
  onEdit: (task:Task) => void;
  onDelete: (index:number)=>void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
    return (
      <ul className="list-disc pl-5">
        {tasks.map((task, index) => (
          <li key={index} className="mb-2">
            <h3 className="font-bold">{task.title} ({task.status})</h3>
            <p>{task.description}</p>
            <button onClick={() => onEdit(task)} className="mr-2 bg-yellow-500 text-white p-1">Edit</button>
            <button onClick={() => onDelete(index)} className="bg-red-500 text-white p-1">Delete</button>
          </li>
        ))}
      </ul>
    );
};

export default TaskList