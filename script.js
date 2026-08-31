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

audio.addEventListener('timeupdate', saveMusicState);
window.addEventListener('pagehide', saveMusicState);

function setTheme(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  themeIcon.src = isDark ? 'static/dark mode.svg' : 'static/light mode.svg';
}

const isDarkMode = localStorage.getItem(themeStorageKey) === 'true';
setTheme(isDarkMode);

themeBtn.addEventListener('click', () => {
  const nextIsDark = !document.body.classList.contains('dark-mode');
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

let currentProject = 0;
let filteredProjects = projects.slice();

// Helper: extract github/demo/primary links from project (supports string or array)
function getLinksFromProject(p) {
  let githubURL = null;
  let demoURL = null;
  // parse anchors from desc first
  const tmp = document.createElement('div');
  tmp.innerHTML = p.desc || '';
  Array.from(tmp.querySelectorAll('a')).forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    if (href.includes('github.com')) githubURL = githubURL || href;
    else demoURL = demoURL || href;
  });
  // then check p.link (supports string or array)
  if (p.link) {
    if (Array.isArray(p.link)) {
      p.link.forEach(h => {
        if (!h) return;
        if (typeof h === 'string') {
          if (h.includes('github.com')) githubURL = githubURL || h;
          else demoURL = demoURL || h;
        }
      });
    } else if (typeof p.link === 'string') {
      if (p.link.includes('github.com')) githubURL = githubURL || p.link;
      else demoURL = demoURL || p.link;
    }
  }
  const primary = demoURL || githubURL || (Array.isArray(p.link) ? p.link[0] : (typeof p.link === 'string' ? p.link : null));
  return { githubURL, demoURL, primary };
}

function showProject(index) {
  const p = filteredProjects[index];
  const view = document.querySelector('.projects-view');
  const titleEl = document.querySelector('.project-title');
  const textEl = document.querySelector('.project-text');
  const tagsContainer = document.querySelector('.project-tags');
  if (!p) {
    view.style.backgroundImage = 'none';
    titleEl.innerHTML = 'No projects';
    textEl.innerHTML = '<p style="text-align:center; width:100%">No projects match the selected filters.</p>';
    if (tagsContainer) tagsContainer.innerHTML = '';
    return;
  }

  view.style.backgroundImage = p.image ? "url('" + p.image + "')" : 'none';
  textEl.innerHTML = p.desc || '';

  // Title: link to primary (demo preferred) when available
  const links = getLinksFromProject(p);
  if (links.primary) {
    titleEl.innerHTML = `<a href="${links.primary}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit;">${p.title}</a>`;
  } else {
    titleEl.textContent = p.title;
  }

  // Render tags and make them interactive
  if (tagsContainer) {
    const tags = p.tags || [];
    tagsContainer.innerHTML = tags.map(t => `<span class="project-tag" data-tag="${t}" tabindex="0" role="button">#${t}</span>`).join('');
    tagsContainer.querySelectorAll('.project-tag').forEach(el => {
      const tag = el.dataset.tag;
      const chip = document.querySelector(`.filter-chip[data-tag="${tag}"]`);
      const handle = () => {
        if (chip) {
          toggleFilter(tag, chip);
        } else {
          if (selectedFilters.has(tag)) selectedFilters.delete(tag);
          else selectedFilters.add(tag);
          updateFilteredProjectsAndUI();
        }
      };
      el.style.cursor = 'pointer';
      el.addEventListener('click', handle);
      el.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); handle(); }
      });
    });
  }

  // Render CTAs (GitHub / Live Demo)
  const descContainer = document.querySelector('.projects-desc');
  if (descContainer) {
    let ctaDiv = descContainer.querySelector('.project-cta');
    if (!ctaDiv) {
      ctaDiv = document.createElement('div');
      ctaDiv.className = 'project-cta';
      const mini = descContainer.querySelector('.mini-flower');
      if (mini) descContainer.insertBefore(ctaDiv, mini);
      else descContainer.appendChild(ctaDiv);
    }
    const links2 = getLinksFromProject(p);
    const externalIcon = `<svg class="cta-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false"><path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"/></svg>`;
    const parts = [];
    if (links2.githubURL) parts.push(`<a class="cta-btn cta-github" href="${links2.githubURL}" target="_blank" rel="noopener noreferrer">GitHub ${externalIcon}</a>`);
    if (links2.demoURL) parts.push(`<a class="cta-btn cta-demo" href="${links2.demoURL}" target="_blank" rel="noopener noreferrer">Live Demo ${externalIcon}</a>`);
    ctaDiv.innerHTML = parts.join('');
    ctaDiv.style.display = parts.length ? 'flex' : 'none';
  }

  // Update dots
  const circles = document.querySelectorAll('.project-circles .project-dot');
  circles.forEach((circle, i) => circle.classList.toggle('active-dot', i === index));
}

// Arrow event listeners
document.querySelector('.right-arrow-container').addEventListener('click', () => {
  if (filteredProjects.length === 0) return;
  currentProject = (currentProject + 1) % filteredProjects.length;
  showProject(currentProject);
});
document.querySelector('.left-arrow-container').addEventListener('click', () => {
  if (filteredProjects.length === 0) return;
  currentProject = (currentProject - 1 + filteredProjects.length) % filteredProjects.length;
  showProject(currentProject);
});

// Initialize

showProject(currentProject);
document.querySelector('.projects-view').onclick = function(e) {
  // Prevent navigation if clicking on arrows
  if (e.target.closest('.left-arrow-container') || e.target.closest('.right-arrow-container')) return;
  const p = filteredProjects[currentProject];
  if (p) {
    const href = getLinksFromProject(p).primary;
    if (href) window.open(href, '_blank');
  }
};




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
