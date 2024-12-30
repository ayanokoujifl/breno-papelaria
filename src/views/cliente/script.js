const header = document.getElementById("header")
header.innerHTML = await fetch("../components/header-cliente.html").then(
  (res) => res.text()
)

const footer = document.getElementById("footer")
footer.innerHTML = await fetch("../components/footer-cliente.html").then(
  (res) => res.text()
)

const cpf = window.location.search.split("=")[1]
const cliente = await fetch(
  `https://breno-papelaria.onrender.com/clientes/findByCpf/${cpf}`
).then((res) => res.json())

const title = document.querySelector(".title-client")
if (cliente[0].nome !== null) {
  title.innerHTML = `Olá, ${cliente[0].nome}!`
  window.document.title = `Perfil - ${cliente[0].nome}`
}

async function getProdutos() {
  return await fetch(
    "https://breno-papelaria.onrender.com/produtos/findAll"
  ).then((res) => res.json())
}

const produtos = await getProdutos()
const main = document.querySelector("main")
main.innerHTML = "<div class='spinner'/>"

produtos ? (main.innerHTML = "") : null
produtos.forEach((produto) => {
  main.innerHTML += `
  <div class="card">
    <div>
    <h4>${produto.nome}</h4>
    <p>${Number(produto.preco).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}</p>
    </div>
    <img src="${produto.imagem}" alt="imagem ilustrativa" class="img-card" />
  </div>
  `
})

const compras = document.querySelector(".compras")
compras.addEventListener("click", () => {
  window.location.href = `./compras.html?id=${cliente.id_cli}`
})
