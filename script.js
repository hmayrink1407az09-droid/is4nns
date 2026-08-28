const products=[
{id:1,name:'iPhone 11',brand:'Apple',spec:'128 GB • seminovo',price:1200,img:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-11-01.jpg'},
{id:2,name:'iPhone 16 Pro Max',brand:'Apple',spec:'256 GB • Titanium',price:5000,img:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-01.jpg'},
{id:3,name:'iPhone XR',brand:'Apple',spec:'64 GB • seminovo',price:999,img:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-xr-01.jpg'},
{id:4,name:'iPhone 12',brand:'Apple',spec:'128 GB • seminovo',price:1599,img:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-01.jpg'},
{id:5,name:'iPhone 13',brand:'Apple',spec:'128 GB • seminovo',price:2199,img:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-01.jpg'},
{id:6,name:'iPhone 14',brand:'Apple',spec:'128 GB • seminovo',price:2599,img:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-01.jpg'},
{id:7,name:'iPhone 15',brand:'Apple',spec:'128 GB • seminovo',price:3999,img:'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-01.jpg'},
{id:8,name:'Galaxy S23',brand:'Samsung',spec:'256 GB • 5G',price:2299,img:'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s23-5g-1.jpg'}
];
let cart=[];
const money=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const grid=document.getElementById('productGrid');
function render(list=products){
 grid.innerHTML=list.map(p=>`<article class="card"><span class="stock">DISPONÍVEL</span><div class="card-image"><img src="${p.img}" alt="${p.name}" loading="lazy"></div><div class="card-body"><span class="card-brand">${p.brand}</span><h3>${p.name}</h3><p class="spec">${p.spec}</p><div class="price">${money(p.price)}</div><button class="buy" onclick="addToCart(${p.id})">Adicionar ao pedido</button></div></article>`).join('')||'<p>Não encontramos esse celular.</p>';
}
function addToCart(id){const p=products.find(x=>x.id===id);if(!cart.some(x=>x.id===id))cart.push(p);updateCart();openCart();toast(`${p.name} adicionado ao pedido`)}
function updateCart(){
 document.getElementById('cartCount').textContent=cart.length;
 document.getElementById('cartItems').innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row"><img src="${p.img}" alt="${p.name}"><div><strong>${p.name}</strong><small>${money(p.price)}</small></div><button class="remove" onclick="removeItem(${i})">×</button></div>`).join(''):'<div style="color:#91a0b1;padding:35px 5px;text-align:center">Seu pedido está vazio.<br><br>Escolha um celular para começar.</div>';
 document.getElementById('cartTotal').textContent=money(cart.reduce((s,p)=>s+p.price,0));
}
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
