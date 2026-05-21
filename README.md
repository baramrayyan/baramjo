# Baramjo Introduction Site Documentation

This document explains how to customize your introduction site using the `config.json` file. Since the site is fully static, all of the dynamic content you see is powered by this single configuration file.

## `config.json` Structure

The `config.json` file is a JSON object that contains several top-level keys representing the different sections of your site.

### 1. Hero Section (`hero`)
Controls the main introductory section at the top of the page.

```json
"hero": {
  "title": "Welcome to Baramjo",          // Large main title
  "subtitle": "Discover My Universe",       // Smaller subtitle below the title
  "description": "I'm a developer...",      // Short introductory paragraph
  "logo": "logo.png",                       // Path to your profile image or logo
  "links": [                                // (Optional) Array of social/contact links
    {
      "name": "GitHub",                     // Display text
      "icon": "fab fa-github",              // (Optional) FontAwesome icon class
      "url": "https://github.com/..."       // Target link
    }
  ]
}
```

### 2. Projects Section (`projects`)
An array of objects representing your portfolio of standalone static sites. These will be displayed as clickable cards.

```json
"projects": [
  {
    "id": "site1",                          // A unique identifier (optional use)
    "title": "My First Site",               // The title displayed on the card
    "description": "A sample static site.", // A short description on the card
    "url": "sites/site1/index.html"         // The actual URL path to the site's index.html
  }
]
```
*Note: Ensure your standalone sites are placed inside the `sites/` folder and linked correctly using the `url` property.*

### 3. Articles Section (`articles`)
An array of objects representing your blog posts. These link to the `blog.html` template.

```json
"articles": [
  {
    "id": "hello-world",                    // MUST BE UNIQUE. Used in the URL (?id=hello-world)
    "title": "Hello World",                 // The title displayed on the blog card and page
    "date": "2026-05-21",                   // The publication date
    "description": "My first blog post.",   // Short snippet for the card
    "file": "blogs/hello-world.md"          // The path to the actual Markdown file
  }
]
```
*Note: To create a new blog, write a `.md` file inside the `blogs/` folder, then add its details to this array.*

### 4. Certifications & Awards Section (`certifications`)
An array of objects representing your notable achievements or certifications.

```json
"certifications": [
  {
    "title": "Cisco Certified Network Associate", // The name of the achievement
    "description": "Passed the CCNA exam.",       // A brief description
    "year": "2025"                                // (Optional) Year it was achieved
  }
]
```

### 5. Skills (`skills`)
An array of your skills displayed as tags in the sidebar.

```json
"skills": [
  {
    "name": "JavaScript",                   // The name of the skill/language
    "level": "Advanced"                     // Your proficiency level
  }
]
```

### 5. Education (`education`)
An array of educational background items that will appear on the timeline.

```json
"education": [
  {
    "title": "Computer Science Degree",     // Your degree or certificate
    "institution": "University of Tech",    // The school or platform
    "year": "2020 - 2024",                  // The timespan (used for sorting)
    "description": "Graduated with honors." // Any extra details
  }
]
```

### 6. Experience (`experience`)
An array of job experiences that will appear on the timeline.

```json
"experience": [
  {
    "title": "Frontend Developer",          // Your job title
    "company": "Tech Corp",                 // The company name
    "year": "2024 - Present",               // The timespan
    "description": "Building modern web..." // Details of your responsibilities
  }
]
```

### 7. Life Experience (`lifeExperience`)
An array of significant personal achievements or events, also added to the timeline.

```json
"lifeExperience": [
  {
    "title": "First Hackathon Win",         // The event title
    "year": "2022",                         // The year it occurred
    "description": "Won first place..."     // Details about the event
  }
]
```

## How the Timelines Work
The JavaScript on the site automatically takes the `education`, `experience`, and `lifeExperience` arrays, and displays them in three separate timeline sections. Within each individual section, the items are sorted chronologically (newest first) based on the first word in the `year` string (e.g., "2024"). If any of these arrays are empty or omitted from the config, that specific timeline section will be automatically hidden.

## Troubleshooting
If the site fails to load your changes:
1. **Invalid JSON**: Make sure your `config.json` is perfectly formatted. A missing comma or an unclosed quote will break the file. You can use a JSON validator online to check.
2. **Local File Restrictions**: If you open `index.html` directly (as a `file://` path) in some browsers, they block fetching `config.json` due to CORS policies. Always use a local server (like `python -m http.server`) for testing.
