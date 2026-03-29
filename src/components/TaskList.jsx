import TaskItem from './TaskItem';
import styles from './TaskList.module.css';

function TaskList({ tasks, onToggle, onEdit, onDelete }) {
    return (
        <ul className={styles.taskList}>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

export default TaskList;
