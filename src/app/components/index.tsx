import {useState} from 'react'
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import Task from './Task';

const TaskPage = () => {
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [editingTask, setEditingTask] = useState<number | null>(null);

    const addTask = (task: Task) => {
        if (editingTask != null) {
            const updatedTasks = tasks.map((t, index) =>
                index === editingTask ? task : t
            );
            setTasks(updatedTasks);
            setEditingTask(null);
        } else {
            setTasks([...tasks, task]);
        }
    };

    const editTask = (task: Task) => {
        setEditingTask(tasks.indexOf(task));
    };

    const deleteTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };
    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
            <TaskForm onSubmit={addTask} initialData={editingTask !== null ? tasks[editingTask] : undefined} />
            <TaskList tasks={tasks} onEdit={editTask} onDelete={deleteTask} />
        </div>
    )
}

export default TaskPage