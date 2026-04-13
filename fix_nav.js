import fs from 'fs';

const urls = {
  'index.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2ZhMzEwOGE3MDMzOTQ3YWY5ZGRlNTNhNTlhNTM4YmRmEgsSBxDjm-_R8hQYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjIwNjQ3NDE1NjM5NDQ5NzQzMA&filename=&opi=89354086',
  'stories.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2UzMjQ0YjEyY2RjYjRmYzBiYjQ2M2MzZTYwMTAzNzM5EgsSBxDjm-_R8hQYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjIwNjQ3NDE1NjM5NDQ5NzQzMA&filename=&opi=89354086',
  'news.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzM3OGMzNTE2MDk4YzQ2Y2U4ZTZhZTAwMTNjZDYzYjEzEgsSBxDjm-_R8hQYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjIwNjQ3NDE1NjM5NDQ5NzQzMA&filename=&opi=89354086',
  'rant.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzNmYjE0ODFlNzMxMjQ5OTE4ZDY2YTE0ZDE3NzUzYzk2EgsSBxDjm-_R8hQYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjIwNjQ3NDE1NjM5NDQ5NzQzMA&filename=&opi=89354086'
};

async function fix() {
  // 1. Re-download clean html
  console.log('Downloading raw files to discard corrupted HTML...');
  for (const [file, url] of Object.entries(urls)) {
    const res = await fetch(url);
    const text = await res.text();
    fs.writeFileSync(file, text);
  }

  const files = Object.keys(urls);
  for (const file of files) {
    let html = fs.readFileSync(file, 'utf8');

    // Desktop Nav
    html = html.replace(
      /(<a[^>]+href=)"[^"]*"([^>]*>\s*<span class="material-symbols-outlined">home<\/span>\s*<span[^>]*>Speak Up<\/span>)/g,
      '$1"index.html"$2'
    );
    html = html.replace(
      /(<a[^>]+href=)"[^"]*"([^>]*>\s*<span class="material-symbols-outlined">campaign<\/span>\s*<span[^>]*>Rant &amp; Vent<\/span>)/g,
      '$1"rant.html"$2'
    );
    html = html.replace(
      /(<a[^>]+href=)"[^"]*"([^>]*>\s*<span class="material-symbols-outlined">auto_stories<\/span>\s*<span[^>]*>Real Talk Stories<\/span>)/g,
      '$1"stories.html"$2'
    );
    html = html.replace(
      /(<a[^>]+href=)"[^"]*"([^>]*>\s*<span class="material-symbols-outlined">newspaper<\/span>\s*<span[^>]*>Campus News<\/span>)/g,
      '$1"news.html"$2'
    );

    // Mobile Nav
    html = html.replace(
      /(<a[^>]+href=)"[^"]*"([^>]*>\s*<span[^>]*>grid_view<\/span>\s*<span[^>]*>Home<\/span>)/g,
      '$1"index.html"$2'
    );
    // Route "Post" to rant.html
    html = html.replace(
      /(<a[^>]+href=)"[^"]*"([^>]*>\s*<span[^>]*>add_box<\/span>\s*<span[^>]*>Post<\/span>)/g,
      '$1"rant.html"$2'
    );

    fs.writeFileSync(file, html);
    console.log(`Updated nav links for ${file}`);
  }
}

fix().catch(console.error);
