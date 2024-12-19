const header = document.getElementById("header")
header.innerHTML = await fetch("../components/header-cliente.html").then(
  (res) => res.text()
)

const footer = document.getElementById("footer")
footer.innerHTML = await fetch("../components/footer-cliente.html").then(
  (res) => res.text()
)

const cpf = window.location.search.split("=")[1]
const cliente = await fetch(`${process.env.API_URL}/clientes/findByCpf/${cpf}`)
  .then((res) => res.json())
  .then((data) => data[0])
console.log(cliente.Nome)

const title = document.querySelector(".title-client")
title.innerHTML = `Olá, ${cliente.Nome}!`

const produtos = await fetch(process.env.API_URL + "/produtos/findAll").then(
  (res) => res.json()
)

const main = document.querySelector("main")
produtos.forEach((produto) => {
  main.innerHTML += `
  <div class="card">
    <div>
    <h4>${produto.Nome}</h4>
    <p>${Number(produto.Preco).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}</p>
    </div>
    <img src="${produto.Imagem}" alt="imagem ilustrativa" />
  </div>
  `
})

const compras = document.querySelector(".compras")
compras.addEventListener("click", () => {
  window.location.href = `./compras.html?cpf=${cpf}`
})
