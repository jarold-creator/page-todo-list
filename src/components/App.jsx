import { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTheme } from '../hooks/useTheme';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import Footer from './Footer';
import styles from './App.module.css';
import '../styles/variables.css';

function App() {
    const [tasks, setTasks] = useLocalStorage('tasks', []);
    const [filter, setFilter] = useState('all');
    const { theme, toggleTheme } = useTheme();

    const addTask = ({ text, date }) => {
        if (!text.trim()) return;
        setTasks([...tasks, { id: crypto.randomUUID(), text, date, completed: false }]);
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

    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'pending':
                return tasks.filter(t => !t.completed);
            case 'completed':
                return tasks.filter(t => t.completed);
            default:
                return tasks;
        }
    }, [tasks, filter]);

    const sortedTasks = useMemo(() => {
        return [...filteredTasks].sort((a, b) => {
            if (!a.date && !b.date) return 0;
            if (!a.date) return 1;
            if (!b.date) return -1;
            return new Date(a.date) - new Date(b.date);
        });
    }, [filteredTasks]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Mis Tareas</h1>
                <button 
                    className={styles.themeToggle} 
                    onClick={toggleTheme}
                    aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
            <TaskInput onAdd={addTask} />
            
            <div className={styles.filters}>
                <button 
                    className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Todas
                </button>
                <button 
                    className={`${styles.filterBtn} ${filter === 'pending' ? styles.active : ''}`}
                    onClick={() => setFilter('pending')}
                >
                    Pendientes
                </button>
                <button 
                    className={`${styles.filterBtn} ${filter === 'completed' ? styles.active : ''}`}
                    onClick={() => setFilter('completed')}
                >
                    Completadas
                </button>
            </div>

            {sortedTasks.length > 0 ? (
                <TaskList
                    tasks={sortedTasks}
                    onToggle={toggleTask}
                    onEdit={editTask}
                    onDelete={deleteTask}
                />
            ) : (
                <div className={styles.emptyState}>
                    <p>No hay tareas que mostrar</p>
                </div>
            )}
            
            <Footer tasks={tasks} onClear={clearCompleted} />
        </div>
    );
}

export default App;
