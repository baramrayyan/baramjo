document.addEventListener('DOMContentLoaded', async () => {
    // Set Year
    document.getElementById('year').textContent = new Date().getFullYear();

    try {
        const response = await fetch('config.json');
        const config = await response.json();

        renderHero(config.hero);
        renderProjects(config.projects);
        renderArticles(config.articles);
        renderCertifications(config.certifications);
        renderTimelines(config.education, config.experience, config.lifeExperience);
        renderSkills(config.skills);

        initAnimations();
        initCommandLineNav();
    } catch (error) {
        console.error('Error loading config:', error);
    }
});

function initCommandLineNav() {
    const input = document.getElementById('cli-input');
    const suggestionsBox = document.getElementById('cli-suggestions');
    if (!input || !suggestionsBox) return;

    const sections = [
        { name: 'Projects', id: 'projects' },
        { name: 'Articles', id: 'articles' },
        { name: 'About', id: 'education-section' }
    ];

    let currentFocus = -1;

    input.addEventListener('input', function () {
        let val = this.value.trim().toLowerCase();
        // Remove 'cd ' if user typed it
        if (val.startsWith('cd ')) {
            val = val.substring(3).trim();
        }

        suggestionsBox.innerHTML = '';
        currentFocus = -1;

        if (!val) {
            suggestionsBox.style.display = 'none';
            return;
        }

        const matches = sections.filter(s => s.name.toLowerCase().startsWith(val));

        if (matches.length > 0) {
            suggestionsBox.style.display = 'block';
            matches.forEach((match) => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${match.name.substring(0, val.length)}</strong>${match.name.substring(val.length)}`;
                li.dataset.target = match.id;

                li.addEventListener('click', function () {
                    input.value = '';
                    suggestionsBox.style.display = 'none';
                    document.getElementById(this.dataset.target).scrollIntoView({ behavior: 'smooth' });
                });
                suggestionsBox.appendChild(li);
            });
        } else {
            suggestionsBox.style.display = 'none';
        }
    });

    input.addEventListener('keydown', function (e) {
        let items = suggestionsBox.getElementsByTagName('li');
        if (e.keyCode === 40) { // Down
            currentFocus++;
            addActive(items);
        } else if (e.keyCode === 38) { // Up
            currentFocus--;
            addActive(items);
        } else if (e.keyCode === 13) { // Enter
            e.preventDefault();
            if (currentFocus > -1) {
                if (items[currentFocus]) items[currentFocus].click();
            } else if (items.length > 0) {
                items[0].click();
            }
        }
    });

    function addActive(items) {
        if (!items) return;
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (items.length - 1);
        items[currentFocus].classList.add('selected');
    }

    function removeActive(items) {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('selected');
        }
    }

    document.addEventListener('click', function (e) {
        if (e.target !== input) {
            suggestionsBox.style.display = 'none';
        }
    });
}

function renderHero(hero) {
    const heroSection = document.getElementById('hero');
    if (!hero) return;

    let socialsHtml = '';
    if (hero.links && hero.links.length > 0) {
        socialsHtml = '<div class="social-links">';
        hero.links.forEach(link => {
            const iconHtml = link.icon ? `<i class="${link.icon}"></i> ` : '';
            socialsHtml += `<a href="${link.url}" class="social-btn" target="_blank" rel="noopener noreferrer">${iconHtml}${link.name}</a>`;
        });
        socialsHtml += '</div>';
    }

    heroSection.innerHTML = `
        <div class="hero-content">
            <h1 class="hero-title">${hero.title}</h1>
            <p class="hero-subtitle">${hero.subtitle}</p>
            <p>${hero.description}</p>
            ${socialsHtml}
        </div>
        <div class="hero-image-container">
            <img src="${hero.logo}" alt="Logo" class="hero-image">
        </div>
    `;
}

function renderProjects(projects) {
    const grid = document.getElementById('projects-grid');
    if (!projects || projects.length === 0) {
        document.getElementById('projects').style.display = 'none';
        return;
    }

    let html = '';
    projects.forEach(project => {
        html += `
            <a href="${project.url}" class="card" target="_blank" rel="noopener noreferrer">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="card-meta">Visit Site &rarr;</div>
            </a>
        `;
    });
    grid.innerHTML = html;
}

function renderArticles(articles) {
    const grid = document.getElementById('articles-grid');
    if (!articles || articles.length === 0) {
        document.getElementById('articles').style.display = 'none';
        return;
    }

    let html = '';
    articles.forEach(article => {
        html += `
            <a href="article.html?id=${article.id}" class="card">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <div class="card-meta">${article.date}</div>
            </a>
        `;
    });
    grid.innerHTML = html;
}

function renderCertifications(certifications) {
    const section = document.getElementById('certifications');
    const container = document.getElementById('certifications-list');
    if (!certifications || certifications.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';

    let tabsHtml = '';
    let bodyHtml = '';

    certifications.forEach((cert, index) => {
        const isActive = index === 0 ? 'active' : '';
        const display = index === 0 ? 'block' : 'none';

        tabsHtml += `<button class="browser-tab ${isActive}" onclick="openBrowserTab(event, 'ach-${index}')">${cert.title}</button>`;

        bodyHtml += `
            <div id="ach-${index}" class="browser-tab-content" style="display: ${display};">
                <h3>${cert.title}</h3>
                <p>${cert.description}</p>
                ${cert.year ? `<span class="year">${cert.year}</span>` : ''}
            </div>
        `;
    });

    container.innerHTML = `
        <div class="browser-mockup">
            <div class="browser-header">
                <div style="display: flex; gap: 6px; padding: 0 16px 10px 8px; align-items: center;">
                    <span style="width: 12px; height: 12px; border-radius: 50%; background: #ff5f56;"></span>
                    <span style="width: 12px; height: 12px; border-radius: 50%; background: #ffbd2e;"></span>
                    <span style="width: 12px; height: 12px; border-radius: 50%; background: #27c93f;"></span>
                </div>
                ${tabsHtml}
            </div>
            <div class="browser-body">
                ${bodyHtml}
            </div>
        </div>
    `;
}

window.openBrowserTab = function (evt, tabId) {
    const mockup = evt.currentTarget.closest('.browser-mockup');

    const contents = mockup.querySelectorAll('.browser-tab-content');
    contents.forEach(content => content.style.display = 'none');

    const tabs = mockup.querySelectorAll('.browser-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    document.getElementById(tabId).style.display = 'block';
    evt.currentTarget.classList.add('active');
};

function renderSkills(skills) {
    const container = document.getElementById('skills-list');
    if (!skills || skills.length === 0) {
        document.getElementById('skills').style.display = 'none';
        return;
    }

    let html = '';
    skills.forEach(skill => {
        html += `<span class="skill-tag">${skill.name} - ${skill.level}</span>`;
    });
    container.innerHTML = html;
}

function renderTimelines(edu, work, life) {
    const buildTimeline = (data, containerId, sectionId, typeFallback) => {
        const section = document.getElementById(sectionId);
        const container = document.getElementById(containerId);

        if (!data || data.length === 0) {
            if (section) section.style.display = 'none';
            return;
        }

        if (section) section.style.display = 'block';

        // Sort by year
        const sorted = [...data].sort((a, b) => {
            const yA = a.year.split(' ')[0];
            const yB = b.year.split(' ')[0];
            return yB.localeCompare(yA);
        });

        let html = '';
        sorted.forEach(item => {
            const subtitle = item.company || item.institution || typeFallback;
            html += `
                <div class="timeline-item">
                    <div class="timeline-date">${item.year}</div>
                    <h3 class="timeline-title">${item.title}</h3>
                    <div class="timeline-subtitle">${subtitle}</div>
                    <p class="timeline-desc">${item.description}</p>
                </div>
            `;
        });
        if (container) container.innerHTML = html;
    };

    buildTimeline(work, 'experience-timeline', 'experience', 'Experience');
    buildTimeline(edu, 'education-timeline', 'education-section', 'Education');
    buildTimeline(life, 'life-timeline', 'life-section', 'Life Event');
}

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
