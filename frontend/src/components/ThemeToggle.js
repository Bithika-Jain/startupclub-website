import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className={`toggle-track ${theme}`}>
        <div className="toggle-thumb">
          {theme === 'light' ? <FiMoon size={14} /> : <FiSun size={14} />}
        </div>
        <FiSun className="toggle-icon sun-icon" size={12} />
        <FiMoon className="toggle-icon moon-icon" size={12} />
      </div>
    </button>
  );
};

export default ThemeToggle;