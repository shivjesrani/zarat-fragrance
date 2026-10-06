// Product names and prices are sample content; replace with confirmed Zarat stock.
const products = [
  {name:'Oud No. 1',category:'Men',notes:'Smoky oud · amber · soft woods',price:3200,tag:'BESTSELLER',tone:'#d7c2a1',image:'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80'},
  {name:'Rose Veil',category:'Women',notes:'Rose petals · musk · warm vanilla',price:2850,tag:'A SOFTER SIDE',tone:'#dfc8c3',image:'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80'},
  {name:'Noir Santal',category:'Unisex',notes:'Sandalwood · spice · skin musk',price:3500,tag:'ZARAT SIGNATURE',tone:'#c8bca8',image:'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80'},
  {name:'Musk Élan',category:'Men',notes:'Clean musk · cedar · bergamot',price:2950,tag:'EVERYDAY FAVOURITE',tone:'#c4c7bc',image:'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=700&q=80'},
  {name:'Jasmine Dusk',category:'Women',notes:'Jasmine · white tea · amber',price:3100,tag:'JUST DISCOVERED',tone:'#d5c8ae',image:'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80'},
  {name:'Saffron Smoke',category:'Unisex',notes:'Saffron · incense · dark woods',price:3750,tag:'FOR THE EVENING',tone:'#cab9a2',image:'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=700&q=80'},
  {name:'Amber Bloom',category:'Women',notes:'Golden amber · orange blossom · vanilla',price:3350,tag:'WARM & GLOWING',tone:'#d8b991',image:'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80'},
  {name:'Cedar Coast',category:'Men',notes:'Sea salt · cedar · fresh citrus',price:3050,tag:'FRESH PICK',tone:'#c3c9c3',image:'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80'},
  {name:'Velvet Musk',category:'Unisex',notes:'White musk · iris · cashmere woods',price:3600,tag:'SOFT & SUBTLE',tone:'#d1c8bd',image:'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=700&q=80'},
  {name:'Peony Affair',category:'Women',notes:'Peony · pear · sheer rose',price:2900,tag:'LIGHT & LOVELY',tone:'#dfc5c5',image:'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80'},
  {name:'Black Reserve',category:'Men',notes:'Black pepper · leather · patchouli',price:3950,tag:'THE NIGHT EDIT',tone:'#b9afa1',image:'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=700&q=80'},
  {name:'Citrus No. 5',category:'Unisex',notes:'Bergamot · neroli · green tea',price:2750,tag:'BRIGHT & EASY',tone:'#d8d0ad',image:'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=700&q=80'}
];
const grid=document.querySelector('#product-grid');
const overlay=document.querySelector('#order-overlay');
const orderSelect=document.querySelector('#order-product');
const bagCount=document.querySelector('.bag-count');
const searchInputs=document.querySelectorAll('.product-search');
let activeFilter='All',bag=0,searchTerm='';
const money=n=>`Rs. ${n.toLocaleString('en-PK')}`;
function render(filter=activeFilter,term=searchTerm){
  activeFilter=filter;searchTerm=term;
  const matches=products.filter(p=>(filter==='All'||p.category===filter)&&`${p.name} ${p.category} ${p.notes}`.toLowerCase().includes(term.toLowerCase()));
  const limit=grid?.dataset.limit&&!term?Number(grid.dataset.limit):matches.length;
  const shown=matches.slice(0,limit);
  if(grid)grid.innerHTML=shown.map(p=>`<article class="product-card"><div class="product-image" style="--tone:${p.tone}"><img loading="lazy" src="${p.image}" alt="${p.name} fragrance"/><span class="product-tag">${p.tag}</span><button class="quick-add" data-buy="${p.name}">Shop now <span>↗</span></button></div><div class="product-info"><h3>${p.name}</h3><strong>${money(p.price)}</strong><p>${p.notes}</p></div></article>`).join('');
  document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===filter));
  const count=document.querySelector('#results-count');if(count)count.textContent=`${matches.length} fragrances`;
  const empty=document.querySelector('.no-results');if(empty)empty.hidden=shown.length>0;
}
function openOrder(name){if(!overlay)return;orderSelect.innerHTML=products.map(p=>`<option value="${p.name}" ${p.name===name?'selected':''}>${p.name} — ${money(p.price)}</option>`).join('');overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';document.querySelector('.order-modal input[name="name"]')?.focus();}
function closeOrder(){if(!overlay)return;overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');document.body.style.overflow='';const form=document.querySelector('#order-form');if(form)form.hidden=false;const success=document.querySelector('.success-state');if(success)success.hidden=true;}
render();
const params=new URLSearchParams(location.search),initialCategory=params.get('category'),initialTerm=params.get('q')||'';
if(initialTerm){searchInputs.forEach(input=>input.value=initialTerm);render(activeFilter,initialTerm);}
if(initialCategory&&grid&&!grid.dataset.limit)render(initialCategory,initialTerm);
searchInputs.forEach(input=>{input.addEventListener('input',e=>render(activeFilter,e.target.value));input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!grid)location.href=`shop.html?q=${encodeURIComponent(input.value)}`;});});
document.addEventListener('click',e=>{
  const filter=e.target.closest('.filter');if(filter)render(filter.dataset.filter,searchTerm);
  const buy=e.target.closest('[data-buy]');if(buy){bag++;if(bagCount)bagCount.textContent=bag;openOrder(buy.dataset.buy);}
  const close=e.target.closest('.modal-close,.done-button');if(close)closeOrder();if(e.target===overlay)closeOrder();
  const qty=e.target.closest('[data-qty]');if(qty){const input=document.querySelector('[name="quantity"]');if(input)input.value=Math.max(1,Math.min(9,+input.value + +qty.dataset.qty));}
  if(e.target.closest('.bag-button'))openOrder(products[0].name);
  if(e.target.closest('.menu-toggle')){document.querySelector('.nav-left')?.classList.toggle('open');document.querySelector('.site-header')?.classList.toggle('menu-open');}
});
document.querySelector('.menu-toggle')?.addEventListener('click',e=>e.currentTarget.setAttribute('aria-expanded',document.querySelector('.site-header')?.classList.contains('menu-open')));
document.querySelector('#order-form')?.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const order={...Object.fromEntries(data.entries()),createdAt:new Date().toISOString()};const saved=JSON.parse(localStorage.getItem('zarat-orders')||'[]');saved.push(order);localStorage.setItem('zarat-orders',JSON.stringify(saved));e.currentTarget.hidden=true;document.querySelector('.success-state').hidden=false;});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeOrder();});
