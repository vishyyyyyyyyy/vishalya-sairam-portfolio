// Music button
const musicBtn = document.getElementById('music-button');
const musicIcon = musicBtn.querySelector('img');
const audio = document.getElementById('audio-player');
audio.loop = true;
let isPlaying = false;     

// Play audio on page load

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.play();
    musicIcon.src = 'static/music on.svg';
  } else {
    audio.pause();
    musicIcon.src = 'static/music off.svg';
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


const projects = [
  {
    title: "Cozy Cat Planner",
    image: 'static/cozy cat planner gif.gif',
    desc: 'A full-stack desktop planner made with Electron that tracks todos + events and features a customizable cat avatar that saves session data. ' +
          'Designed in Figma, the app includes animated backgrounds and timed pop-up messages for a playful, engaging experience. ' +
          'It’s the perfect organizer for college students who want to have a cute but functional planner while staying productive.',
    link: 'https://github.com/vishyyyyyyyyy/cozy-cat-planner'
  },
  {
    title: "LoveBeatz",
    image: 'static/lovebeatz image .png',
    desc: 'This heart-themed rhythm visualizer created using p5.js responds dynamically to music using p5.ftt. ' +
          'The central heart pulses to a song’s mid-frequency energies, while the waveform and floating ' +
          'heart particles react in real time, with interactive hearts that pop and respawn.',
    link: 'https://www.codedex.io/bb6jD421cUM8OEhhmSgN/live'
  },

  {
    title: "Cupid's Kitchen",
    image: "static/cupids kitchen gif.gif",
    desc: 'Cupid’s Kitchen is a fictional restaurant menu website where users can order dishes infused with love to share with a special someone. ' +
        'Inspired by a scene in Descendants, the site features interactive hearts on the homepage, ' +
        'an order section with multiple input types, animated buttons, and a playful checkout process linked to a YouTube song. ' +
        'Built with HTML5, CSS3, and JavaScript, and designed in Figma, the project highlights interactive design and creative UI elements.',
    link: 'https://vishyyyyyyyyy.github.io/restraunt-menu/'
  },

  {
    title: "BEARly a Hero",
    image: 'static/bearly a hero cover.png',
    desc: 'BEARly a Hero is a 2D game where you play as a mischievous bear who ' +
    'once stole from the poor but decides to use his skills to help the forest community. ' +
    'Players explore different scenes, collect stolen treasures to restore balance, ' +
    'and avoid getting caught while experiencing animated characters, timed text, and collision-triggered scene transitions. ' +
    'Built with Godot 4.x, GDScript and visuals created in Aesprite, the project demonstrates scene-based progression, physics interactions, and interactive storytelling.',
    link: 'https://vishyyyyyyyyy.itch.io/bear-ly-a-hero'
  },
  // Add more projects as needed
];

let currentProject = 0;

function showProject(index) {
  document.querySelector('.projects-view').style.backgroundImage = "url('" + projects[index].image + "')";
  document.querySelector('.project-text').innerHTML = projects[index].desc;
  document.querySelector('.project-title').innerHTML = `<a href="${projects[index].link}" target="_blank" style="text-decoration:none;color:inherit;">${projects[index].title}</a>`;

  // Highlight the current project circle
  const circles = document.querySelectorAll('.project-circles .pink-floaty, .project-circles .green-floaty');
  circles.forEach((circle, i) => {
    if (i === index) {
      circle.classList.remove('pink-floaty');
      circle.classList.add('green-floaty');
    } else {
      circle.classList.remove('green-floaty');
      circle.classList.add('pink-floaty');
    }
  });
}

// Arrow event listeners
document.querySelector('.right-arrow-container').addEventListener('click', () => {
  currentProject = (currentProject + 1) % projects.length;
  showProject(currentProject);
});
document.querySelector('.left-arrow-container').addEventListener('click', () => {
  currentProject = (currentProject - 1 + projects.length) % projects.length;
  showProject(currentProject);
});

// Initialize
showProject(currentProject);