export default async function handler(request) {
  const url = new URL(request.url);
  if (url.searchParams.get('submit') !== 'broomprofit-once-20261011') {
    return new Response('Not found', { status: 404 });
  }
  const base='https://broomprofit-quote.netlify.app';
  const key='35f7c5c03fee9c7f995def726a45f3fa';
  const paths=['/','/guides/','/guides/partial-home-cleaning-estimate','/guides/cleaning-person-hours','/guides/cleaning-job-profit','/free-cleaning-job-profit-calculator'];
  try {
    const upstream = await fetch('https://api.indexnow.org/indexnow', {
      method:'POST',
      headers: { 'content-type':'application/json; charset=utf-8' },
      body: JSON.stringify({
        host:'broomprofit-quote.netlify.app',
        key,
        keyLocation:base+'/'+key+'.txt',
        urlList:paths.map(p=>base+p)
      })
    });
    return Response.json({indexNowHttpStatus:upstream.status, accepted:upstream.status===200 || upstream.status===202, urls:paths.length}, {status:200, headers:{'Cache-Control':'no-store'}});
  } catch (error) {
    return Response.json({accepted:false, error:'IndexNow endpoint unreachable'}, {status:502, headers:{'Cache-Control':'no-store'}});
  }
}