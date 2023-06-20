import React, { useEffect, useState } from 'react';
import './DarkMode.css'; 
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    setIsDarkMode(currentTheme === 'dark');
  }, []);

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className='dark_mode'>
      <input
        className='dark_mode_input'
        type='checkbox'
        id='darkmode-toggle'
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
      <label className='dark_mode_label' htmlFor='darkmode-toggle'>
        <div className='slide_bar'>
          <div className='slide_bar_thumb'></div>
        </div>
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
