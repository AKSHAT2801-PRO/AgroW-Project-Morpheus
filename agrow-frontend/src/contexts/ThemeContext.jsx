import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    // Initialise from localStorage so the preference persists across reloads
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('agrow-theme') === 'dark';
    });

    // Apply / remove `dark` class on <html> whenever isDark changes
    useEffect(() => {
        const html = document.documentElement;
        if (isDark) {
            html.classList.add('dark');
            localStorage.setItem('agrow-theme', 'dark');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('agrow-theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
