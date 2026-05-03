import { useEffect, memo } from 'react';
import styles from './ConfirmModal.module.css';

const ConfirmModal = memo(function ConfirmModal({ 
    isOpen, 
    title = 'Confirmar acción', 
    message, 
    confirmText = 'Confirmar', 
    cancelText = 'Cancelar', 
    onConfirm, 
    onCancel,
    danger = true 
}) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onCancel();
            if (e.key === 'Enter') onConfirm();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onCancel, onConfirm]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onCancel}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {danger && (
                    <div className={styles.icon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                )}
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.message}>{message}</div>
                <div className={styles.actions}>
                    <button className={styles.cancelBtn} onClick={onCancel}>
                        {cancelText}
                    </button>
                    <button 
                        className={`${styles.confirmBtn} ${danger ? styles.danger : ''}`} 
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
});

ConfirmModal.displayName = 'ConfirmModal';

export default ConfirmModal;