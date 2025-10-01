// Music button
const musicBtn = document.getElementById('music-button');
const musicIcon = musicBtn.querySelector('img');
const audio = document.getElementById('audio-player');
let isPlaying = false;     

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    musicIcon.src = 'static/music off.svg';
  } else {
    audio.play();
    musicIcon.src = 'static/music on.svg';
  }
  isPlaying = !isPlaying;
});

// Theme button
const themeBtn = document.getElementById('theme-button');
const themeIcon = document.getElementById('theme-icon');
let darkMode = false;

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeIcon.src = darkMode ? 'static/light mode.svg' : 'static/dark mode.svg';
  darkMode = !darkMode;
});

// Resume button
const resumeBtn = document.getElementById('resume-button');
resumeBtn.addEventListener('click', () => {
  window.open('Vishalya_Sairam_Resume_2025.pdf', '_blank');
});