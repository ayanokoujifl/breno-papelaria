const header = document.getElementById("header")
header.innerHTML = await fetch("../components/header-cliente.html").then(
  (res) => res.text()
)

const footer = document.getElementById("footer")
footer.innerHTML = await fetch("../components/footer-cliente.html").then(
  (res) => res.text()
)

const id = window.location.search.split("=")[1]
const cliente = await fetch(
  `https://breno-papelaria.onrender.com/clientes/${id}`
).then((res) => res.json())
const h1 = document.querySelector("h1")
h1.innerHTML = `Compras de ${cliente.nome}`
h1.style.fontWeight = "900"
const navProdutos = document.querySelector(".produtos")
navProdutos.addEventListener("click", () => {
  window.location.href = "/cliente?cpf=" + cliente.cpf
})

const main = document.querySelector("main")
main.innerHTML = "<div class='spinner'/>"

const vendas = await fetch(
  `https://breno-papelaria.onrender.com/vendas/findByCliente/${id}`
).then((res) => res.json())
console.log(vendas)

vendas ? (main.innerHTML = "") : null

vendas.forEach((venda) => {
  const data = new Date(venda.createdAt).toLocaleDateString("pt-BR")
  main.innerHTML += `
  <div class="card">
    <div>
    <h4>${data}</h4>
    <p>${Number(venda.valortotal).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })} - ${venda.formapagamento}</p>
    </div>
  </div>
  `
})
