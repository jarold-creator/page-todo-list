import { useState } from 'react';
import styles from './TaskItem.module.css';

function TaskItem({ task, onToggle, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);
    const [editDate, setEditDate] = useState(task.date || '');

    const handleSave = () => {
        if (editText.trim()) {
            onEdit(task.id, { text: editText, date: editDate || null });
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setEditText(task.text);
            setEditDate(task.date || '');
            setIsEditing(false);
        }
    };

    const startEditing = () => {
        setEditText(task.text);
        setEditDate(task.date || '');
        setIsEditing(true);
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short'
        });
    };

    const isOverdue = () => {
        if (!task.date || task.completed) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const taskDate = new Date(task.date);
        return taskDate < today;
    };

    return (
        <li className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
            <input
                type="checkbox"
                className={styles.checkbox}
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />

            <div className={styles.content}>
                {isEditing ? (
                    <div className={styles.editGroup}>
                        <input
                            type="text"
                            className={styles.editInput}
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                        <input
                            type="date"
                            className={styles.editDate}
                            value={editDate}
                            onChange={(e) => setEditDate(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            className={styles.saveButton}
                            onClick={handleSave}
                        >
                            Guardar
                        </button>
                    </div>
                ) : (
                    <div className={styles.textRow}>
                        <span className={styles.text}>{task.text}</span>
                        {task.date && (
                            <span className={`${styles.dateBadge} ${isOverdue() ? styles.overdue : ''}`}>
                                {formatDate(task.date)}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {!isEditing && (
                <div className={styles.buttonGroup}>
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
                </div>
            )}
        </li>
    );
}

export default TaskItem;
