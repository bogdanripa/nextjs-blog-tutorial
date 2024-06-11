export async function GET(request) {
  let cnt = parseInt(request.url.replace(/^.*cnt=/, ''))
  let body = 'DONE';
  const nowInMs = Date.now();
  if (cnt>0) {
    cnt--;
    //let response = await fetch(`http://localhost:3000/api/hello?cnt=${cnt}`);
    let response = await fetch(`https://nextjs-blog-tutorial-cns6.vercel.app/api/hello2?cnt=${cnt}`);
    body = await response.text();
  }
  return new Response(`${cnt} - ${Date.now() - nowInMs}\n${body}`);
}
