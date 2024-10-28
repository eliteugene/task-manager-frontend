import { FormEvent,useEffect, useState } from 'react'
import { Task, fetchCreate, fetchLogin, fetchUpdate, fetchDelete, fetchRead } from '../api';

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
        onSubmit({ title, description, status, user: initialData?.user, id: initialData?.id});
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

const TaskPage = () => {
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [editingTask, setEditingTask] = useState<number | null>(null);
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        if (userId === ''){
            const doFetchLogin = async () => {
                const data = await fetchLogin()
                setUserId(data.user.id)
            }
            
            doFetchLogin()
        }else if (userId !== ''){
            const doFetchRead = async () => {
                const data = await fetchRead()
                setTasks(data.docs)
            }
            doFetchRead()
        }
    },[userId])

    const addTask = async (task: Task) => {
        if (editingTask != null) {
            const updatedTasks = tasks.map((t, index) =>
                index === editingTask ? task : t
            );
            setTasks(updatedTasks);
            console.log(task)
            await fetchUpdate(task, userId)
            setEditingTask(null);
        } else {
            const data = await fetchCreate(task, userId)
            const { doc } = data;
            setTasks([...tasks, doc]);
        }
    };

    const editTask = (task: Task) => {
        setEditingTask(tasks.indexOf(task));
    };

    const deleteTask = async (index: number) => {
        fetchDelete(tasks[index].id)
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