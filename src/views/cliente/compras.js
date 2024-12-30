const header = document.getElementById("header")
header.innerHTML = await fetch("../components/header-cliente.html").then(
  (res) => res.text()
)

const footer = document.getElementById("footer")
footer.innerHTML = await fetch("../components/footer-cliente.html").then(
  (res) => res.text()
)

const cpf = window.location.search.split("=")[1]

const navProdutos = document.querySelector(".produtos")
navProdutos.addEventListener("click", () => {
  window.location.href = "/cliente?cpf=" + cpf
})

const main = document.querySelector("main")
main.innerHTML = "<div class='spinner'/>"

const id_cli = window.parent.location.search.split("=")[0]
console.log(id_cli)
const compras = await fetch(
  `https://breno-papelaria.onrender.com/vendas/findByCliente${id_cli}`
)
