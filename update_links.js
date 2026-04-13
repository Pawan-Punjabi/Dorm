import fs from 'fs';

const files = ['index.html', 'stories.html', 'news.html', 'rant.html'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  
  let html = fs.readFileSync(file, 'utf8');

  const links = [
    { text: 'Speak Up', target: 'index.html' },
    { text: 'Rant &amp; Vent', target: 'rant.html' },
    { text: 'Real Talk Stories', target: 'stories.html' },
    { text: 'Campus News', target: 'news.html' },
    { text: 'Home', target: 'index.html' },
    { text: 'Post', target: 'rant.html' }
  ];

  for (const link of links) {
    const regex = new RegExp(`(<a[^>]+href=)"[^"]*"([^>]*>[\\s\\S]*?<span[^>]*>${link.text}<\/span>)`, 'g');
    html = html.replace(regex, `$1"${link.target}"$2`);
  }

  // Also catch 'Speak Out' button inside <button> to warp into a link, or just let it be. 
  // Let's replace href="#" with href="index.html" for the main logo
  html = html.replace(/href="#"(.*>Dorm<\/span>)/g, 'href="index.html"$1');

  fs.writeFileSync(file, html);
  console.log(`Updated ${file}`);
}
