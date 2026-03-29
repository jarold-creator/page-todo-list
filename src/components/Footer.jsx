import styles from './Footer.module.css';

function Footer({ tasks, onClear }) {
    const taskCount = tasks.length;
    const hasCompleted = tasks.some(task => task.completed);

    return (
        <footer className={styles.footer}>
            <span className={styles.count}>
                {taskCount} tarea{taskCount !== 1 ? 's' : ''}
            </span>
            {hasCompleted && (
                <button className={styles.clearButton} onClick={onClear}>
                    Limpiar completadas
                </button>
            )}
        </footer>
    );
}

export default Footer;
