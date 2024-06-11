async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  return response.text();
}

export async function GET(request) {
  const nowInMs = Date.now();
  const url = 'https://nextjs-blog-tutorial-cns6.vercel.app/api/hello1';
  //const url = 'http://localhost:3000/api/hello1';
  const promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(fetchData(url));
  }
  const results = await Promise.all(promises);
  console.log('All responses:', results);
  return new Response(`${Date.now() - nowInMs}\n`);
}
