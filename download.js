import fs from 'fs';

const urls = {
  'index.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2ZhMzEwOGE3MDMzOTQ3YWY5ZGRlNTNhNTlhNTM4YmRmEgsSBxDjm-_R8hQYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjIwNjQ3NDE1NjM5NDQ5NzQzMA&filename=&opi=89354086',
  'stories.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2UzMjQ0YjEyY2RjYjRmYzBiYjQ2M2MzZTYwMTAzNzM5EgsSBxDjm-_R8hQYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjIwNjQ3NDE1NjM5NDQ5NzQzMA&filename=&opi=89354086',
  'news.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzM3OGMzNTE2MDk4YzQ2Y2U4ZTZhZTAwMTNjZDYzYjEzEgsSBxDjm-_R8hQYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjIwNjQ3NDE1NjM5NDQ5NzQzMA&filename=&opi=89354086',
  'rant.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzNmYjE0ODFlNzMxMjQ5OTE4ZDY2YTE0ZDE3NzUzYzk2EgsSBxDjm-_R8hQYAZIBJAoKcHJvamVjdF9pZBIWQhQxNjIwNjQ3NDE1NjM5NDQ5NzQzMA&filename=&opi=89354086'
};

async function download() {
  for (const [file, url] of Object.entries(urls)) {
    console.log(`Downloading ${file}...`);
    const res = await fetch(url);
    const text = await res.text();
    fs.writeFileSync(file, text);
    console.log(`Saved ${file} (${text.length} bytes)`);
  }
}

download().catch(console.error);
