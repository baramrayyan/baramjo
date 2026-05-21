document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('year').textContent = new Date().getFullYear();

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (!articleId) {
        document.getElementById('article-content').innerHTML = '<p>Article not found.</p>';
        return;
    }

    try {
        const response = await fetch('config.json');
        const config = await response.json();
        
        const article = config.articles.find(a => a.id === articleId);
        
        if (!article) {
            document.getElementById('article-content').innerHTML = '<p>Article not found.</p>';
            return;
        }

        // Set Header
        document.getElementById('article-header').innerHTML = `
            <h1>${article.title}</h1>
            <div class="date">${article.date}</div>
        `;
        document.title = `${article.title} - Baramjo`;

        // Fetch Markdown
        const mdResponse = await fetch(article.file);
        if (!mdResponse.ok) throw new Error('Failed to load markdown file');
        
        const markdown = await mdResponse.text();
        
        // Render Markdown
        document.getElementById('article-content').innerHTML = marked.parse(markdown);

        // Init simple animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    } catch (error) {
        console.error('Error loading article:', error);
        document.getElementById('article-content').innerHTML = '<p>Error loading article content.</p>';
    }
});
