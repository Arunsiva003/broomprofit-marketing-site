export default async function(request) {
  const u=new URL(request.url);
  if(u.searchParams.get('once')!=='room-scope-20261011')return new Response('Not found',{status:404});
  const key='35f7c5c03fee9c7f995def726a45f3fa',base='https://broomprofit-quote.netlify.app';
  try{
    const upstream=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify({host:'broomprofit-quote.netlify.app',key,keyLocation:base+'/'+key+'.txt',urlList:[base+'/',base+'/house-cleaning-quote-calculator']})});
    return Response.json({status:upstream.status,accepted:[200,202].includes(upstream.status)},{headers:{'Cache-Control':'no-store'}});
  }catch(e){return Response.json({error:'submission_unavailable'},{status:502});}
}