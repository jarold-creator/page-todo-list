import { useState } from 'react';
import styles from './TaskInput.module.css';

function TaskInput({ onAdd }) {
    const [text, setText] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd({ text, date: date || null });
        setText('');
        setDate('');
    };

    return (
        <form className={styles.inputContainer} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Nueva tarea..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <input
                    type="date"
                    className={styles.dateInput}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <button type="submit" className={styles.button}>
                Agregar
            </button>
        </form>
    );
}

export default TaskInput;
