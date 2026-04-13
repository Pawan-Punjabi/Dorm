import fs from 'fs';

const files = ['index.html', 'stories.html', 'news.html', 'rant.html'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');

  // Replace all <a> tags based on their inner content
  html = html.replace(/<a([^>]+)href="[^"]*"([^>]*)>([\s\S]*?)<\/a>/gi, (match, prefix, suffix, inner) => {
    let target = "#";
    
    // Determine the target based on the text inside the anchor
    if (inner.includes('Speak Up') || (inner.includes('Home') && !inner.includes('Profile'))) {
      target = 'index.html';
    } else if (inner.includes('Rant &amp; Vent') || inner.includes('Post')) {
      target = 'rant.html';
    } else if (inner.includes('Real Talk Stories')) {
      target = 'stories.html';
    } else if (inner.includes('Campus News')) {
      target = 'news.html';
    } else if (inner.includes('>Dorm<')) {
      // The main header logo in index.html is actually a span or div, but if there's an <a> wrapped Dorm
      target = 'index.html';
    }
    
    // Avoid accidentally breaking external links if they exist, though Stitch exported them as #
    if (target !== "#") {
      return `<a${prefix}href="${target}"${suffix}>${inner}</a>`;
    }
    return match;
  });

  fs.writeFileSync(file, html);
  console.log(`Successfully hard-linked ${file}`);
}
