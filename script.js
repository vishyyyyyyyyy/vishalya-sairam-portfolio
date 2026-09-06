const musicBtn = document.getElementById('music-button');
const musicIcon = musicBtn.querySelector('img');
const audio = document.getElementById('audio-player');
const themeBtn = document.getElementById('theme-button');
const themeIcon = document.getElementById('theme-icon');
const themeStorageKey = 'portfolio-dark-mode';
const musicStorageKey = 'portfolio-music-state';

audio.loop = true;

function setMusicIcon(isPlaying) {
  musicIcon.src = isPlaying ? 'static/music on.svg' : 'static/music off.svg';
}

function saveMusicState() {
  sessionStorage.setItem(musicStorageKey, JSON.stringify({
    currentTime: audio.currentTime,
    isPlaying: !audio.paused
  }));
}

const savedMusicState = JSON.parse(sessionStorage.getItem(musicStorageKey) || 'null');
const shouldPlayMusic = savedMusicState ? savedMusicState.isPlaying : true;
setMusicIcon(shouldPlayMusic);

if (savedMusicState && Number.isFinite(savedMusicState.currentTime)) {
  audio.addEventListener('loadedmetadata', () => {
    audio.currentTime = savedMusicState.currentTime;
  }, { once: true });
}

if (shouldPlayMusic) {
  audio.play().catch(() => {
    setMusicIcon(false);
    saveMusicState();
  });
}

musicBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().then(() => {
      setMusicIcon(true);
      saveMusicState();
    }).catch(() => setMusicIcon(false));
  } else {
    audio.pause();
    setMusicIcon(false);
    saveMusicState();
  }
});

const processSection = document.querySelector('.process-section');
const processTabs = [...document.querySelectorAll('.process-nav a')];
const processPanels = [...document.querySelectorAll('.process-panel')];

if (processSection && processTabs.length && processPanels.length) {
  let activeProcessIndex = 0;

  function setActiveProcess(index, shouldFocus = false) {
    activeProcessIndex = (index + processTabs.length) % processTabs.length;
    processTabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === activeProcessIndex;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-current', isActive ? 'step' : 'false');
    });
    processPanels.forEach((panel, panelIndex) => {
      panel.classList.toggle('is-active', panelIndex === activeProcessIndex);
    });
    if (shouldFocus) processTabs[activeProcessIndex].focus({ preventScroll: true });
  }

  processTabs.forEach((tab, tabIndex) => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      setActiveProcess(tabIndex);
      processPanels[tabIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    tab.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveProcess(tabIndex + 1, true);
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveProcess(tabIndex - 1, true);
      }
    });
  });

  const processObserver = new IntersectionObserver((entries) => {
    const visiblePanels = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => second.intersectionRatio - first.intersectionRatio);
    if (!visiblePanels.length) return;
    const visibleIndex = processPanels.indexOf(visiblePanels[0].target);
    if (visibleIndex !== -1) setActiveProcess(visibleIndex);
  }, { rootMargin: '-35% 0px -50% 0px', threshold: [0, .25, .5, .75, 1] });

  processPanels.forEach((panel) => processObserver.observe(panel));

  setActiveProcess(0);
}

audio.addEventListener('timeupdate', saveMusicState);
window.addEventListener('pagehide', saveMusicState);

function setTheme(isDark) {
  document.documentElement.classList.toggle('dark-mode', isDark);
  document.body.classList.toggle('dark-mode', isDark);
  themeIcon.src = isDark ? 'static/dark mode.svg' : 'static/light mode.svg';
}

const isDarkMode = localStorage.getItem(themeStorageKey) === 'true';
setTheme(isDarkMode);

themeBtn.addEventListener('click', () => {
  const nextIsDark = !document.documentElement.classList.contains('dark-mode');
  setTheme(nextIsDark);
  localStorage.setItem(themeStorageKey, String(nextIsDark));
});


const funGalleryBackdrop = document.createElement('div');
funGalleryBackdrop.className = 'fun-gallery-backdrop';
document.body.appendChild(funGalleryBackdrop);

const funGalleryItems = [...document.querySelectorAll('.fun-gallery-item')];

function closeFunGallerySelection() {
  funGalleryItems.forEach(item => {
    item.classList.remove('is-selected', 'is-dimmed');
  });
  funGalleryBackdrop.classList.remove('is-visible');
}

funGalleryItems.forEach(item => {
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'gallery-close';
  closeButton.setAttribute('aria-label', 'Close image');
  closeButton.textContent = '×';
  closeButton.addEventListener('click', (event) => {
    event.stopPropagation();
    closeFunGallerySelection();
  });
  item.appendChild(closeButton);

  item.addEventListener('click', () => {
    const isSelected = item.classList.contains('is-selected');

    funGalleryItems.forEach(card => {
      card.classList.remove('is-selected', 'is-dimmed');
    });

    if (!isSelected) {
      item.classList.add('is-selected');
      funGalleryItems.forEach(card => {
        if (card !== item) {
          card.classList.add('is-dimmed');
        }
      });
      funGalleryBackdrop.classList.add('is-visible');
    } else {
      funGalleryBackdrop.classList.remove('is-visible');
    }
  });
});

funGalleryBackdrop.addEventListener('click', closeFunGallerySelection);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeFunGallerySelection();
  }
});

const projects = [
  {
    title: "Cozy Cat Planner",
    image: 'static/cozy cat planner gif.gif',
    desc: 'A cozy desktop productivity app that helps users organize tasks, events and to-dos with a dress-up-able cat! Built with Electron for a seamless cross-platform experience.',
    tags: ['fullstack','electron','javascript'],
    link: ['https://github.com/vishyyyyyyyyy/cozy-cat-planner']
  },
  {
    title: "Before I Fade",
    image: 'static/b4ifade.png',
    desc: 'A 2D visual novel where you play as a ghost, waking up exactly 1 month after your death. Created with Godot and GDScript, the game dives into puzzle mechanics and narrative storytelling, along with visual effects. It’s a project very close to my heart, inspired by my love for storytelling and pixel art games.',
    tags: ['game dev'],
    link: ['https://vishyyyyyyyyy.itch.io/before-i-fade', 'https://github.com/vishyyyyyyyyy/before-I-fade']
  },
  {
    title: "BEARly a Hero",
    image: 'static/bearly a hero cover.png',
    desc: 'A pixel-art stealth game, built in Godot where players sneak through levels, avoid detection, and make choices that shift the story from selfish to selfless.',
    tags: ['game dev'],
    link: ['https://vishyyyyyyyyy.itch.io/bear-ly-a-hero', 'https://github.com/vishyyyyyyyyy/Bearly-A-Hero']
  },
  {
    title: "Fate Framed",
    image: 'static/fateframed.png',
    desc: 'A narrative-driven risk assessment experience that transforms complex data into an interactive storytelling journey for first-time users.',
    tags: ['fullstack','ai', 'javascript', 'python'],
    link: ['https://vishyyyyyyyyy.itch.io/before-i-fade', 'https://web-production-8abdd.up.railway.app/']
  },
  {
    title: "Candy Hearts",
    image: 'static/valentine.jpeg',
   desc: 'A small valentines day project made for my boyfriend. Created with dynamic JavaScript DOM maniputlation, Candy hearts is a interactive experience wher you open a box of sweethears and eat them all to reveal a suprise :)',
    tags: ['frontend', 'javascript'],
    link: ['https://github.com/vishyyyyyyyyy/valentine-s-day-candy-hearts', 'https://valentine-s-day-candy-hearts.vercel.app/']
  },
  {
    title: "MAIpos",
    image: 'static/maipos.png',
    desc: 'A full-stack restaurant POS system with dynamic table management, order tracking, and intuitive UI designed for fast-paced environments.', 
    tags: ['fullstack','react','ai'],
    link: ['https://maipos.vercel.app/', 'https://github.com/vishyyyyyyyyy/mai-shan-yun-tabler']
  },
  {
    title: "Punch Data Analysis",
    image: 'static/punch.jpeg',
    desc: 'A deep dive into how one tiny monkey took over the internet. Using Python and data analysis, this project explores how viral trends spread and why people can’t stop watching.',
    tags: ['data science', 'python','pandas','matplotlib'],
    link: ['https://colab.research.google.com/drive/1F2e9pVWdCX9mxPVnE3aGtbj3Nlixeco9?usp=sharing', 'https://www.figma.com/deck/Zt9Q1GH93LAziYfKSOlAp5/How-Did-One-Baby-Monkey-Influence-the-Internet-and-the-Real-World-?node-id=1-42&t=kIQiU3QxNIgMHpsS-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1']
  },
  {
    title: "ToyoQuest",
    image: 'static/toyoquest.jpeg',
    desc: 'An AI-powered interactive application that combines storytelling and user input to help first time car buyers make informed decisions.',
    tags: ['fullstack', 'python', 'react', 'ai'],
    link: 'https://github.com/vishyyyyyyyyy/ToyoQuest'
  },
 
];


// --- Attach click handlers to floaties ---
window.addEventListener('DOMContentLoaded', function() {


    // Randomize floaty animation for each #floaty-random element
    const floaties = document.querySelectorAll('#floaty-random');
    floaties.forEach(floaty => {
      // Random duration between 4s and 10s
      const duration = (Math.random() * 8 + 8).toFixed(2) + 's';
      // Random delay between 0s and 3s
      const delay = (Math.random() * 3).toFixed(2) + 's';
      floaty.style.animationDuration = duration;
      floaty.style.animationDelay = delay;
    });
  


});
