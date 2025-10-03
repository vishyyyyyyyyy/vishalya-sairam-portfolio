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
    image: "static/cupid's kitchen gif.gif",
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

// --- Skill Modal Popup Logic ---

const skillData = {
  'python': {
    img: 'static/python icon.svg',
    title: 'Python',
  text: `I learnt Python in 2025 summer as my first programming language through Codexed and completed the Python certificate.<br>Along the way, I built fun mini-projects like <a href='https://fat-cat-dressup.onrender.com/' target='_blank' class='skill-modal-link'>Fat Cat Dress Up</a> and <a href='https://www.codedex.io/community/final-project/ogR6DQFFOvLITTcW8vqi' target='_blank' class='skill-modal-link'>Python Cat Gif</a>, which helped me practice loops, functions, and problem-solving.`,
    cert: 'python certificate.pdf',
    certText: 'View Certification',

  },
  'java': {
    img: 'static/java icon.svg',
    title: 'Java',
    text: 'I started studying Java for my classes in college and have grown to enjoy its versatility and object-oriented features! I have made mini projects like a <a href="https://www.codedex.io/community/final-project/GGGwpbTjKoBPwRPgigqk" target="_blank" class="skill-modal-link">GUI todo list app</a> and a <a href="https://www.codedex.io/@vishyyyyyyyyy/build/pet-sim" target="_blank" class="skill-modal-link">cute terminal pet sim</a>.',
    cert: '',
    certText: '',
    links: []
  },
  'javascript': {
    img: 'static/javascript icon.svg',
    title: 'JavaScript',
    text: '“I started learning JavaScript to bring my websites to life with interactivity and animations. It’s been challenging, but it’s also super fun to use for making playful UI elements and dynamic features across my projects!”',
    cert: '',
    certText: '',
    links: []
  },
  'html': {
    img: 'static/html icon.svg',
    title: 'HTML',
    text: 'I started learning HTML alongside CSS to build fun little websites (like this one!). It was my intro to structuring pages, linking content, and bringing ideas to life on the web',
    cert: 'html certificate.pdf',
    certText: '',
    links: []
  },
  'figma': {
    img: 'static/figma icon.svg',
    title: 'Figma',
    text: 'Figma is where all my ideas start. I sketch out layouts, play with colors, and build frames that guide my coding process. It’s my favorite space to experiment before bringing everything to life with code. Some of my designs can be viewed here: <a href="https://www.figma.com/design/yxLbaj0aJsmCHMHqLFZHKP/Figma-design-frames?node-id=0-1&t=2mfsBZMWIGvUqtRO-1" target="_blank" class="skill-modal-link">Figma Designs</a>.',
    cert: '',
    certText: '',
    links: []
  },
  'css': {
    img: 'static/css icon.svg',
    title: 'CSS',
    text: 'CSS helps bring the magic from my designs into life in code. It’s where I get to play with colors, layouts, and tiny details to give each project its own personality.',
    certText: '',
    links: []
  }
};

function showSkillModal(skill) {
  const data = skillData[skill];
  if (!data) return;
  document.getElementById('skillModalImg').src = data.img;
  document.getElementById('skillModalTitle').textContent = data.title;
  document.getElementById('skillModalText').innerHTML = data.text;
  // Links
  const linksDiv = document.getElementById('skillModalLinks');
  linksDiv.innerHTML = '';
  if (data.links && data.links.length) {
    const label = document.createElement('span');
    label.textContent = 'Links: ';
    linksDiv.appendChild(label);
    data.links.forEach((link, idx) => {
      const a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.text;
      a.target = '_blank';
      a.className = 'skill-modal-link';
      linksDiv.appendChild(a);
      if (idx < data.links.length - 1) {
        linksDiv.appendChild(document.createTextNode(' '));
      }
    });
  }
  // Certification
  const certBtn = document.getElementById('skillModalCert');
  if (data.cert) {
    certBtn.href = data.cert;
    certBtn.textContent = data.certText || 'View Certification';
    certBtn.style.display = 'inline-block';
  } else {
    certBtn.style.display = 'none';
  }
  document.getElementById('skillModalOverlay').style.display = 'flex';
}

function hideSkillModal() {
  document.getElementById('skillModalOverlay').style.display = 'none';
}

document.getElementById('skillModalClose').onclick = hideSkillModal;
document.getElementById('skillModalOverlay').onclick = function(e) {
  if (e.target === this) hideSkillModal();
};

// --- Attach click handlers to floaties ---
window.addEventListener('DOMContentLoaded', function() {
  // Map floaty images to skill keys
  const skillMap = {
    'python icon.svg': 'python',
    'java icon.svg': 'java',
    'javascript icon.svg': 'javascript',
    'html icon.svg': 'html',
    'figma icon.svg': 'figma',
    'css icon.svg': 'css'
  };
  document.querySelectorAll('.skill-logo').forEach(function(img) {
    const src = img.getAttribute('src');
    const file = src.split(/[\\\/]/).pop();
    const skill = skillMap[file];
    if (skill) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function(e) {
        e.stopPropagation();
        showSkillModal(skill);
      });
    }
  });
});