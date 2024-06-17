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

export default async function handler(req, res) {
  const nowInMs = Date.now();
  const url = 'https://https://nextjs-blog-tutorial-ten-bice.vercel.app/api/hello1';
  const promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(fetchData(url));
  }
  const results = await Promise.all(promises);
  const fetchTimes = results.map(result => result.fetchTime);
  const responseTexts = results.map(result => result.text);
  console.log('All responses:', responseTexts);
  res.status(200).send(`${fetchTimes.join('\n')}\n`);
}
