const phoneImage=(model,color='#111827')=>`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="700" height="900" viewBox="0 0 700 900"><rect width="700" height="900" fill="#eef2f6"/><g transform="translate(190 55)"><rect x="0" y="0" width="320" height="790" rx="52" fill="#080d14"/><rect x="10" y="10" width="300" height="770" rx="44" fill="${color}" stroke="#ffffff" stroke-opacity=".25" stroke-width="4"/><rect x="25" y="25" width="270" height="740" rx="38" fill="#101820"/><circle cx="160" cy="52" r="8" fill="#05080c"/><text x="160" y="410" text-anchor="middle" fill="#e8f4ff" font-family="Arial,sans-serif" font-size="28" font-weight="700">${model}</text></g></svg>`)}`;
const raw={
1:['iPhone 11','https://img.olx.com.br/thumbs700x500/26/260686196291667.webp','#1d7a55'],
2:['iPhone 16 Pro Max','https://img.olx.com.br/thumbs700x500/44/445648671410728.webp','#b5a68a'],
3:['iPhone XR','https://img.olx.com.br/thumbs700x500/86/864635311400368.webp','#d61f35'],
4:['iPhone 12','https://img.olx.com.br/thumbs700x500/18/183646674960596.webp','#c82333'],
5:['iPhone 13','https://img.olx.com.br/thumbs700x500/79/796613557520671.webp','#d71939'],
6:['iPhone 14','https://img.olx.com.br/thumbs700x500/56/561643173503615.webp','#ef3340'],
7:['iPhone 15','https://img.olx.com.br/thumbs700x500/29/290674559610396.webp','#1e88a8'],
8:['Galaxy S23','https://img.olx.com.br/thumbs700x500/71/713657293429879.webp','#111827']
};
const products=[
{id:1,name:'iPhone 11',brand:'Apple',spec:'128 GB • seminovo',price:1200,img:raw[1][1],fallback:phoneImage(raw[1][0],raw[1][2])},
{id:2,name:'iPhone 16 Pro Max',brand:'Apple',spec:'256 GB • Titanium',price:5000,img:raw[2][1],fallback:phoneImage(raw[2][0],raw[2][2])},
{id:3,name:'iPhone XR',brand:'Apple',spec:'64 GB • seminovo',price:999,img:raw[3][1],fallback:phoneImage(raw[3][0],raw[3][2])},
{id:4,name:'iPhone 12',brand:'Apple',spec:'128 GB • seminovo',price:1599,img:raw[4][1],fallback:phoneImage(raw[4][0],raw[4][2])},
{id:5,name:'iPhone 13',brand:'Apple',spec:'128 GB • seminovo',price:2199,img:raw[5][1],fallback:phoneImage(raw[5][0],raw[5][2])},
{id:6,name:'iPhone 14',brand:'Apple',spec:'128 GB • seminovo',price:2599,img:raw[6][1],fallback:phoneImage(raw[6][0],raw[6][2])},
{id:7,name:'iPhone 15',brand:'Apple',spec:'128 GB • seminovo',price:3999,img:raw[7][1],fallback:phoneImage(raw[7][0],raw[7][2])},
{id:8,name:'Galaxy S23',brand:'Samsung',spec:'256 GB • 5G',price:2299,img:raw[8][1],fallback:phoneImage(raw[8][0],raw[8][2])}
];
let cart=[];
const money=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const grid=document.getElementById('productGrid');
const safeImg=(p,extra='')=>`<img src="${p.img}" data-fallback="${p.fallback}" alt="Foto real do ${p.name}" loading="lazy" referrerpolicy="no-referrer" ${extra} onerror="this.onerror=null;this.src=this.dataset.fallback">`;
function render(list=products){grid.innerHTML=list.map(p=>`<article class="card"><span class="stock">DISPONÍVEL</span><div class="card-image">${safeImg(p)}</div><div class="card-body"><span class="card-brand">${p.brand}</span><h3>${p.name}</h3><p class="spec">${p.spec}</p><div class="price">${money(p.price)}</div><button class="buy" onclick="addToCart(${p.id})">Adicionar ao pedido</button></div></article>`).join('')||'<p>Não encontramos esse celular.</p>';}
function addToCart(id){const p=products.find(x=>x.id===id);if(!cart.some(x=>x.id===id))cart.push(p);updateCart();openCart();toast(`${p.name} adicionado ao pedido`)}
function updateCart(){document.getElementById('cartCount').textContent=cart.length;document.getElementById('cartItems').innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row">${safeImg(p)}<div><strong>${p.name}</strong><small>${money(p.price)}</small></div><button class="remove" onclick="removeItem(${i})">×</button></div>`).join(''):'<div style="color:#91a0b1;padding:35px 5px;text-align:center">Seu pedido está vazio.<br><br>Escolha um celular para começar.</div>';document.getElementById('cartTotal').textContent=money(cart.reduce((s,p)=>s+p.price,0));}
function removeItem(i){cart.splice(i,1);updateCart()}
function openCart(){document.getElementById('cart').classList.remove('hidden');document.getElementById('overlay').classList.remove('hidden')}
function closeCart(){document.getElementById('cart').classList.add('hidden');document.getElementById('overlay').classList.add('hidden')}
function toast(text){const t=document.getElementById('toast');t.textContent=text;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2400)}
document.getElementById('cartOpen').onclick=openCart;
document.getElementById('cartClose').onclick=closeCart;
document.getElementById('overlay').onclick=closeCart;
document.getElementById('search').addEventListener('input',e=>{const q=e.target.value.toLowerCase().trim();render(products.filter(p=>(p.name+' '+p.brand+' '+p.spec).toLowerCase().includes(q)))})
document.getElementById('sort').addEventListener('change',e=>{let list=[...products];if(e.target.value==='low')list.sort((a,b)=>a.price-b.price);if(e.target.value==='high')list.sort((a,b)=>b.price-a.price);render(list)})
document.getElementById('checkout').addEventListener('click',async()=>{if(!cart.length){toast('Adicione um celular ao pedido primeiro.');return}const lines=cart.map(p=>`• ${p.name} — ${money(p.price)}`).join('\n');const text=`Olá, InfoTech Muriaé! Tenho interesse nestes celulares:\n${lines}\nTotal: ${money(cart.reduce((s,p)=>s+p.price,0))}\n\nGostaria de confirmar disponibilidade e condições.`;try{await navigator.clipboard.writeText(text);toast('Pedido copiado! Agora envie a mensagem para a loja.')}catch(e){window.prompt('Copie sua mensagem de pedido:',text)}});
render();updateCart();