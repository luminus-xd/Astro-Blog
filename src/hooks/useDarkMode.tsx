import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

const useDarkMode = (): [Theme, () => void] => {
    const [theme, setTheme] = useState<Theme>('light');

    const setMode = (mode: Theme) => {
        window.localStorage.setItem('theme', mode);
        setTheme(mode);
        if (mode === 'dark') {
            document.documentElement.setAttribute('data-dark', 'true');
        } else {
            document.documentElement.removeAttribute('data-dark');
        }
    };

    const toggleTheme = () => {
        setMode(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme') as Theme;
        if (localTheme) {
            setMode(localTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setMode('dark');
        } else {
            setMode('light');
        }
    }, []);

    return [theme, toggleTheme];
};

export default useDarkMode;
