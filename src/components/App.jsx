import { useLocalStorage } from '../hooks/useLocalStorage';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import Footer from './Footer';
import styles from './App.module.css';
import '../styles/variables.css';

function App() {
    const [tasks, setTasks] = useLocalStorage('tasks', []);

    const addTask = ({ text, date }) => {
        if (!text.trim()) return;
        setTasks([...tasks, { id: Date.now(), text, date, completed: false }]);
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const editTask = (id, { text, date }) => {
        if (!text.trim()) return;
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, text, date } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const clearCompleted = () => {
        setTasks(tasks.filter(task => !task.completed));
    };

    const sortedTasks = [...tasks].sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date) - new Date(b.date);
    });

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Mis Tareas</h1>
            <TaskInput onAdd={addTask} />
            <TaskList
                tasks={sortedTasks}
                onToggle={toggleTask}
                onEdit={editTask}
                onDelete={deleteTask}
            />
            <Footer tasks={tasks} onClear={clearCompleted} />
        </div>
    );
}

export default App;
