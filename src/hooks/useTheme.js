import { useState, useEffect } from 'react';

export function useTheme() {
    const [theme, setTheme] = useState(() => {
        try {
            const saved = window.localStorage.getItem('theme');
            if (saved) return saved;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } catch {
            return 'light';
        }
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            window.localStorage.setItem('theme', theme);
        } catch (e) {
            console.error('Error guardando tema:', e);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return { theme, toggleTheme };
}