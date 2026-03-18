import { db, ref, onValue } from "./firebase.js";

const produtosContainer = document.getElementById('produtosContainer');
const itensCarrinho = document.getElementById('itensCarrinho');
const totalCarrinho = document.getElementById('totalCarrinho');
const comprarBtn = document.getElementById('comprar');

let carrinho = [];
let total = 0;

const produtosRef = ref(db, 'produtos');

onValue(produtosRef, snapshot => {
  produtosContainer.innerHTML = '';
  snapshot.forEach(child => {
    const produto = child.val();
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${produto.imagem || ''}" alt="${produto.nome}" style="width:100%; border-radius:8px;">
      <h3>${produto.nome}</h3>
      <p>Preço: R$ ${produto.preco}</p>
      <p>Estoque: ${produto.estoque}</p>
      <button onclick="adicionarAoCarrinho('${child.key}','${produto.nome}',${produto.preco},${produto.estoque})">Comprar</button>
    `;
    produtosContainer.appendChild(card);
  });
});

window.adicionarAoCarrinho = (id, nome, preco, estoque) => {
  if (estoque <= 0) { alert('Produto esgotado!'); return; }
  carrinho.push({id,nome,preco});
  total += preco;
  atualizarCarrinho();
};

function atualizarCarrinho() {
  itensCarrinho.innerHTML = '';
  carrinho.forEach(item => {
    const p = document.createElement('p');
    p.textContent = `${item.nome} - R$ ${item.preco}`;
    itensCarrinho.appendChild(p);
  });
  totalCarrinho.textContent = `Total: R$ ${total}`;
}

comprarBtn.onclick = () => {
  if (carrinho.length === 0) return alert("Carrinho vazio!");
  let mensagem = "Olá, quero comprar:\n";
  carrinho.forEach(item => mensagem += `${item.nome} - R$ ${item.preco}\n`);
  mensagem += `Total: R$ ${total}`;
  const link = `https://wa.me/5581995367131?text=${encodeURIComponent(mensagem)}`;
  window.open(link,'_blank');
};
