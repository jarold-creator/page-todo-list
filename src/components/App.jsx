import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import Footer from './Footer';
import styles from './App.module.css';
import '../styles/variables.css';

function App() {
    const [tasks, setTasks] = useLocalStorage('tasks', []);

    const addTask = (text) => {
        if (!text.trim()) return;
        setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const editTask = (id, newText) => {
        if (!newText.trim()) return;
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, text: newText } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const clearCompleted = () => {
        setTasks(tasks.filter(task => !task.completed));
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Mis Tareas</h1>
            <TaskInput onAdd={addTask} />
            <TaskList
                tasks={tasks}
                onToggle={toggleTask}
                onEdit={editTask}
                onDelete={deleteTask}
            />
            <Footer tasks={tasks} onClear={clearCompleted} />
        </div>
    );
}

export default App;
