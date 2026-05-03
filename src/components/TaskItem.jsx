import { useState, memo } from 'react';
import ConfirmModal from './ConfirmModal';
import styles from './TaskItem.module.css';

const TaskItem = memo(({ task, onToggle, onEdit, onDelete }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editText, setEditText] = useState(task.text);
    const [editDate, setEditDate] = useState(task.date || '');

    const handleSave = () => {
        if (editText.trim()) {
            onEdit(task.id, { text: editText, date: editDate || null });
            setShowEditModal(false);
        }
    };

    const cancelEdit = () => {
        setEditText(task.text);
        setEditDate(task.date || '');
        setShowEditModal(false);
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

    const confirmDelete = () => {
        onDelete(task.id);
        setShowDeleteModal(false);
    };

    return (
        <>
            <li className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                    aria-label={`Marcar como ${task.completed ? 'pendiente' : 'completada'}`}
                />

                <div className={styles.content}>
                    <div className={styles.textRow}>
                        <span className={styles.text}>{task.text}</span>
                        {task.date && (
                            <span className={`${styles.dateBadge} ${isOverdue() ? styles.overdue : ''}`}>
                                {formatDate(task.date)}
                            </span>
                        )}
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        className={styles.editButton}
                        onClick={() => setShowEditModal(true)}
                        aria-label="Editar tarea"
                    >
                        ✏️
                    </button>
                    <button
                        className={styles.deleteButton}
                        onClick={() => setShowDeleteModal(true)}
                        aria-label="Eliminar tarea"
                    >
                        🗑️
                    </button>
                </div>
            </li>

            <ConfirmModal
                isOpen={showEditModal}
                title="Editar tarea"
                message={
                    <div className={styles.editForm}>
                        <input
                            type="text"
                            className={styles.editInputModal}
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            placeholder="Descripción de la tarea"
                            autoFocus
                        />
                        <input
                            type="date"
                            className={styles.editDateModal}
                            value={editDate}
                            onChange={(e) => setEditDate(e.target.value)}
                        />
                    </div>
                }
                confirmText="Guardar"
                cancelText="Cancelar"
                onConfirm={handleSave}
                onCancel={cancelEdit}
                danger={false}
            />

            <ConfirmModal
                isOpen={showDeleteModal}
                title="Eliminar tarea"
                message={`¿Estás seguro de eliminar "${task.text}"? Esta acción no se puede deshacer.`}
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
                danger
            />
        </>
    );
});

TaskItem.displayName = 'TaskItem';

export default TaskItem;
