import { useState } from 'react';
import styles from './TaskInput.module.css';

function TaskInput({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text);
        setText('');
    };

    return (
        <form className={styles.inputContainer} onSubmit={handleSubmit}>
            <input
                type="text"
                className={styles.input}
                placeholder="Nueva tarea..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className={styles.button}>
                Agregar
            </button>
        </form>
    );
}

export default TaskInput;
