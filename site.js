(() => {
  const demoInputs=[...document.querySelectorAll('.room-input')];
  const cash=v=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(v);
  function update(){
    const rooms=demoInputs.filter(i=>i.checked);const mins=rooms.reduce((s,i)=>s+Number(i.dataset.minutes),0);const hours=mins/60;
    const cost=hours*25+30;const rate=.03, margin=.25;
    const price=rooms.length?Math.ceil((cost/(1-rate-margin))/5)*5:0;
    document.querySelector('#demo-price').textContent=rooms.length?cash(price):'Select a room';
    document.querySelector('#demo-hours').textContent=hours.toFixed(2)+' person-hours';
    document.querySelector('#demo-cost').textContent=cash(rooms.length?cost:0);
    document.querySelector('#demo-rooms').textContent=rooms.length+' task groups';
  }
  demoInputs.forEach(i=>i.addEventListener('change',update));update();
  // Never allow an unverified checkout link. Configuration contains only a public URL.
  const settings=window.BROOMPROFIT||{};
  const symbol=settings.currency==='INR'?'₹':'$';
  if(['USD','INR'].includes(settings.currency)&&Number.isFinite(Number(settings.launchPrice))&&Number(settings.launchPrice)>0){
    document.querySelector('#published-price').textContent=symbol+Number(settings.launchPrice).toLocaleString('en-US',{maximumFractionDigits:2});
    document.querySelector('#published-currency').textContent=settings.currency+' introductory price';
  }
  const checkout=document.querySelector('#checkout');const url=settings.checkoutUrl;
  if(url){try{const parsed=new URL(url);if(parsed.protocol==='https:'&&['payhip.com','www.payhip.com'].includes(parsed.hostname)){
    checkout.href=parsed.href;checkout.textContent='Get BroomProfit ↗';
    document.querySelector('#checkout-note').textContent='Secure checkout and download delivery handled by Payhip.';
  }}catch{}}
  const contact=window.BROOMPROFIT?.contactUrl;
  if(contact){try{const parsed=new URL(contact);if(parsed.protocol==='https:'&&['payhip.com','www.payhip.com'].includes(parsed.hostname)){
    document.querySelector('#contact').href=parsed.href;document.querySelector('#contact').textContent='Contact';
  }}catch{}}
})();