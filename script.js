// Music button 
const musicBtn = document.getElementById('music-button');
const musicIcon = musicBtn.querySelector('img');
const audio = document.getElementById('audio-player');
audio.loop = true;
let isPlaying = true;    
musicIcon.src = 'static/music on.svg'; 
// Play audio on page load
window.addEventListener('DOMContentLoaded', function() {
  audio.play().catch(() => {
    // Autoplay blocked, show music off icon
    musicIcon.src = 'static/music off.svg';
    isPlaying = false;
  });
});

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    musicIcon.src = 'static/music off.svg';
    isPlaying = false;
  } else {
    audio.play();
    musicIcon.src = 'static/music on.svg';
    isPlaying = true;
  }
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
    text: 'I started learning JavaScript to bring my websites to life with interactivity and animations. It’s been challenging, but it’s also super fun to use for making playful UI elements and dynamic features across my projects!',
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
    text: 'Figma is where all my ideas start. I sketch out layouts, play with colors, and build frames that guide my coding process. It’s my favorite space to experiment before bringing everything to life with code. Some of my designs can be viewed here: <a href="https://www.figma.com/deck/qF8dsN3SQ6PJmhcsIaP8I4/Figma-design-frames?node-id=0-260&t=9lmW6nF9srJkZEVs-1" target="_blank" class="skill-modal-link">Figma Design Frames</a>.',
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
  },
  'illustrator': {
    img: 'static/Adobe Illustrator icon.svg',
    title: 'Adobe Illustrator',
    text: 'I use Adobe Illustrator for creating vector graphics, icons, and digital illustrations for my design and coding projects. It helps me bring creative ideas to life with precision and style. Some of my projects can be viewed here: <a href="https://www.figma.com/deck/oSbiPUpGCZabO1UeGGHGOk/Adobe-Illustrator-Projects?node-id=3-260&t=pwid68WNwUkB6tE3-1" target="_blank" class="skill-modal-link">Illustrator Projects Link</a>',
    cert: 'https://www.credly.com/badges/184d0386-fe79-4eeb-9f0c-2d219ddd6747',
    certText: '',
    links: []
  },
  'photoshop': {
    img: 'static/Adobe Photoshop icon.svg',
    title: 'Adobe Photoshop',
    text: 'Adobe Photoshop is my go-to for editing images, creating mockups, and experimenting with digital art. I use it to enhance visuals and add creative touches to my web and UX projects. Some of my projects can be viewed here: <a href="https://www.figma.com/deck/5QHkTyziwZBbfLUPTrMWyS/Adobe-Photoshop-Projects?node-id=0-605&t=pwid68WNwUkB6tE3-1" target="_blank" class="skill-modal-link">Photoshop Projects Link</a>',
    cert: 'https://www.credly.com/badges/184d0386-fe79-4eeb-9f0c-2d219ddd6747',
    certText: 'View Certification'
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
      ,'Adobe Illustrator icon.svg': 'illustrator'
      ,'Adobe Photoshop icon.svg': 'photoshop'
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

//Projects: View All + Tag Filters
let selectedFilters = new Set();

function getAllTags() {
  const s = new Set();
  projects.forEach(p => (p.tags || []).forEach(t => s.add(t)));
  return Array.from(s);
}

function buildTagFilters() {
  const container = document.getElementById('project-filters');
  if (!container) return;
  const tags = getAllTags();
  container.innerHTML = '';
  tags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'filter-chip';
    btn.type = 'button';
    btn.textContent = tag;
    btn.dataset.tag = tag;
    btn.setAttribute('aria-pressed','false');
    btn.addEventListener('click', () => {
      toggleFilter(tag, btn);
    });
    container.appendChild(btn);
  });
}

function toggleFilter(tag, btn) {
  if (selectedFilters.has(tag)) {
    selectedFilters.delete(tag);
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed','false');
  } else {
    selectedFilters.add(tag);
    btn.classList.add('active');
    btn.setAttribute('aria-pressed','true');
  }
  // Update filtered carousel and (if visible) the projects grid
  updateFilteredProjectsAndUI();
}

function createProjectCardHTML(p) {

  const tmp = document.createElement('div');
  tmp.innerHTML = p.desc || '';
  let text = tmp.textContent || tmp.innerText || '';
  text = text.replace(/\s+/g, ' ').trim();
  if (text.length > 160) text = text.slice(0,157) + '...';

  const tagsHTML = (p.tags || []).map(t => `<span class="project-tag">#${t}</span>`).join(' ');

  // Build safe CTAs (github / demo / fallback view) with inline icon
  const viewIcon = `<svg class="cta-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true" focusable="false"><path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"/></svg>`;
  tmp.innerHTML = p.desc || '';
  const anchors = Array.from(tmp.querySelectorAll('a'));
  let githubURL = null;
  let demoURL = null;
  anchors.forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    if (href.includes('github.com')) githubURL = href;
    else if (!demoURL) demoURL = href;
  });
  // Fallback to p.link
  if (!demoURL && p.link && !p.link.includes('github.com')) demoURL = p.link;
  if (!githubURL && p.link && p.link.includes('github.com')) githubURL = p.link;

  const ctaParts = [];
  if (githubURL) ctaParts.push(`<a class="cta-btn cta-github" href="${githubURL}" target="_blank" rel="noopener noreferrer">GitHub ${viewIcon}</a>`);
  if (demoURL) ctaParts.push(`<a class="cta-btn cta-demo" href="${demoURL}" target="_blank" rel="noopener noreferrer">Live Demo ${viewIcon}</a>`);
  const normalized = getLinksFromProject(p);
  const fallbackHref = normalized.demoURL || normalized.githubURL || normalized.primary;
  const viewLink = ctaParts.join(' ') || (fallbackHref ? `<a class="cta-btn cta-view" href="${fallbackHref}" target="_blank" rel="noopener noreferrer">View ${viewIcon}</a>` : '');
  return `
    <div class="project-card">
      <img src="${p.image}" alt="${p.title} screenshot" loading="lazy">
      <div class="project-card-body">
        <h3>${p.title}</h3>
        <div class="project-card-tags">${tagsHTML}</div>
        <p>${text}</p>
        <div class="project-cta">${viewLink}</div>
      </div>
    </div>`;
}

function renderAllProjects() {
  const container = document.getElementById('all-projects-grid');
  if (!container) return;
  const filters = Array.from(selectedFilters);
  const filtered = projects.filter(p => {
    if (filters.length === 0) return true;
    const ptags = p.tags || [];
    // show projects that match any selected tag
    return ptags.some(t => filters.includes(t));
  });
  container.innerHTML = filtered.map(p => createProjectCardHTML(p)).join('') || '<p style="text-align:center; width:100%">No projects match that filter.</p>';
  container.style.display = filtered.length ? 'grid' : 'none';
}


function initProjectGallery() {
  buildTagFilters();
}

window.addEventListener('DOMContentLoaded', initProjectGallery);

// --- Carousel dots / filtered list integration ---
function getFilteredProjects() {
  const filters = Array.from(selectedFilters);
  if (filters.length === 0) return projects.slice();
  return projects.filter(p => (p.tags||[]).some(t => filters.includes(t)));
}

function renderCarouselDots() {
  const dotsContainer = document.querySelector('.project-circles');
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  const count = filteredProjects.length || 0;
  for (let i = 0; i < Math.max(count, 1); i++) {
    const dot = document.createElement('div');
    dot.className = 'project-dot pink-floaty';
    dot.style.width = '20px';
    dot.style.height = '20px';
    dot.style.margin = '0 6px';
    dot.dataset.index = i;
    dot.addEventListener('click', (e) => {
      const idx = Number(e.currentTarget.dataset.index);
      if (idx < filteredProjects.length) {
        currentProject = idx;
        showProject(currentProject);
      }
    });
    dotsContainer.appendChild(dot);
  }
}

function updateFilteredProjectsAndUI() {
  filteredProjects = getFilteredProjects();
  currentProject = 0;
  renderCarouselDots();
  showProject(currentProject);
  // Also refresh the all-projects grid if visible
  const grid = document.getElementById('all-projects-grid');
  if (grid && (grid.style.display === 'grid' || window.getComputedStyle(grid).display !== 'none')) {
    renderAllProjects();
  }
}

// (toggleFilter now directly calls updateFilteredProjectsAndUI)

// initialize filteredProjects / dots on initial load
window.addEventListener('DOMContentLoaded', () => {
  filteredProjects = projects.slice();
  renderCarouselDots();
});