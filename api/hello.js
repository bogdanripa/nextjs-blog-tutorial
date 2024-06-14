async function fetchData(url) {
  const startTime = Date.now();
  const response = await fetch(url);
  const fetchTime = Date.now() - startTime;
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  const text = await response.text();
  return { text, fetchTime };
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
  const fetchTimes = results.map(result => result.fetchTime);
  const responseTexts = results.map(result => result.text);
  console.log('All responses:', responseTexts);
  return new Response(`${fetchTimes.join('\n')}\n`);
}
