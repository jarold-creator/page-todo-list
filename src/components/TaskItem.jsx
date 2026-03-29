import { useState } from 'react';
import styles from './TaskItem.module.css';

function TaskItem({ task, onToggle, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleSave = () => {
        if (editText.trim()) {
            onEdit(task.id, editText);
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setEditText(task.text);
            setIsEditing(false);
        }
    };

    const startEditing = () => {
        setEditText(task.text);
        setIsEditing(true);
    };

    return (
        <li className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
            <input
                type="checkbox"
                className={styles.checkbox}
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />

            {isEditing ? (
                <input
                    type="text"
                    className={styles.editInput}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleSave}
                    autoFocus
                />
            ) : (
                <span className={styles.text}>{task.text}</span>
            )}

            <div className={styles.buttonGroup}>
                {!isEditing && (
                    <>
                        <button
                            className={styles.editButton}
                            onClick={startEditing}
                        >
                            Editar
                        </button>
                        <button
                            className={styles.deleteButton}
                            onClick={() => onDelete(task.id)}
                        >
                            Eliminar
                        </button>
                    </>
                )}
            </div>
        </li>
    );
}

export default TaskItem;
