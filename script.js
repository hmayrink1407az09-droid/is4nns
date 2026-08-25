const gate=document.getElementById('ageGate');
const enter=document.getElementById('enterBtn');
const status=document.getElementById('pixStatus');
const key='31999132746';
if(localStorage.getItem('is4nns-age')==='ok')gate.classList.add('hidden');
enter.addEventListener('click',()=>{localStorage.setItem('is4nns-age','ok');gate.classList.add('hidden')});

async function copyPix(){
  try{await navigator.clipboard.writeText(key);status.textContent='Chave Pix copiada. Abra seu banco e faça o pagamento de R$ 4,99.'}
  catch(e){status.textContent='Chave Pix: '+key}
}
document.getElementById('copyBtn').addEventListener('click',copyPix);

document.getElementById('pixBtn').addEventListener('click',async()=>{
  await copyPix();
  // Não existe uma URL universal do navegador que abra todos os bancos
  // brasileiros já com um Pix preenchido. O botão copia a chave imediatamente
  // e mostra o valor para concluir com segurança no aplicativo do banco.
  setTimeout(()=>window.location.hash='pagamento',50);
});
