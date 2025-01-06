import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"

const header = document.getElementById("header")
header.innerHTML = await fetch("../components/header.html").then((res) =>
  res.text()
)

const clientesPage = document.getElementById("clientes")
clientesPage.addEventListener("click", () => {
  window.location.href = "/admin/models/cliente"
})

const funcionariosPage = document.getElementById("funcionarios")
funcionariosPage.addEventListener("click", () => {
  window.location.href = "/admin/models/funcionario"
})

const produtosPage = document.getElementById("produtos")
produtosPage.addEventListener("click", () => {
  window.location.href = "/admin/models/produto"
})

const vendasPage = document.getElementById("vendas")
vendasPage.addEventListener("click", () => {
  window.location.href = "/admin/models/venda"
})

const comprasPage = document.getElementById("compras")
comprasPage.addEventListener("click", () => {
  window.location.href = "/admin/models/compra"
})

const fornecedoresPage = document.getElementById("fornecedores")
fornecedoresPage.addEventListener("click", () => {
  window.location.href = "/admin/models/fornecedor"
})

const footer = document.getElementById("footer")
footer.innerHTML = await fetch("../components/footer.html").then((res) =>
  res.text()
)

const today = new Date()
const lastWeek = new Date(today.getTime() - 7 * 24 * 3600 * 1000)

const minDate = document.getElementById("start")
const maxDate = document.getElementById("end")
minDate.value = lastWeek.toISOString().split("T")[0]
maxDate.value = today.toISOString().split("T")[0]

/* const getData = async (minDate, maxDate) => {
  const dataVendas = await fetch(
    "https://breno-papelaria.onrender.com/vendas/findByDate?minDate=" +
      minDate.value +
      "&maxDate=" +
      maxDate.value
  ).then((res) => res.json())

  const dataCompras = await fetch(
    "https://breno-papelaria.onrender.com/compras/findByDate?minDate=" +
      minDate.value +
      "&maxDate=" +
      maxDate.value
  ).then((res) => res.json())

  return [dataVendas, dataCompras]
} */

const MESES = [
  {
    number: 1,
    name: "Janeiro",
  },
  {
    number: 2,
    name: "Fevereiro",
  },
  {
    number: 3,
    name: "Março",
  },
  {
    number: 4,
    name: "Abril",
  },
  {
    number: 5,
    name: "Maio",
  },
  {
    number: 6,
    name: "Junho",
  },
  {
    number: 7,
    name: "Julho",
  },
  {
    number: 8,
    name: "Agosto",
  },
  {
    number: 9,
    name: "Setembro",
  },
  {
    number: 10,
    name: "Outubro",
  },
  {
    number: 11,
    name: "Novembro",
  },
  {
    number: 12,
    name: "Dezembro",
  },
]

async function getData() {
  const dataVendas = await fetch(
    "https://breno-papelaria.onrender.com/vendas/findAll"
  ).then((res) => res.json())
  const dataCompras = await fetch(
    "https://breno-papelaria.onrender.com/compras/findAll"
  ).then((res) => res.json())
  const filteredVendas = dataVendas.filter((venda) => {
    const vendaDate = new Date(venda.createdAt)
    return vendaDate >= lastWeek && vendaDate <= today
  })

  const filteredCompras = dataCompras.filter((compra) => {
    const compraDate = new Date(compra.createdAt)
    return compraDate >= lastWeek && compraDate <= today
  })

  return [filteredVendas, filteredCompras]
}

const [filteredVendas, filteredCompras] = await getData()

const tableSection = document.querySelector(".table-section")
const table = document.createElement("table")
table.setAttribute("border", "1")
const fields = [
  "Mês",
  "Vendas",
  "Compras",
  "FP",
  "CMAT",
  "CMAN",
  "Lucro Bruto",
  "Lucro Liquido",
]

const tbody = document.createElement("tbody") // Certifique-se de ter um <tbody> no HTML
const thead = document.createElement("thead") // Certifique-se de ter um <thead> no HTML

// Adicionar os cabeçalhos na tabela
fields.forEach((field) => {
  const th = document.createElement("th")
  th.textContent = field
  thead.appendChild(th)
})

// Agrupar dados por mês
const groupedByMonth = {}

// Agrupar vendas (Total Arrecadado)
filteredVendas.forEach((venda) => {
  const monthKey = MESES.find((mes) => mes.name === venda.mes).number
  console.log(`Processando venda: ${monthKey}, valor: ${venda.valortotal}`)
  if (!groupedByMonth[monthKey]) {
    groupedByMonth[monthKey] = { arrecadado: 0, gasto: 0 }
  }
  groupedByMonth[monthKey].arrecadado += Number(venda.valortotal)
})

// Agrupar compras (Total Gasto)
filteredCompras.forEach((compra) => {
  const monthKey = MESES.find((mes) => mes.name === compra.mes).number // Usar o campo 'mes' diretamente
  if (!groupedByMonth[monthKey]) {
    groupedByMonth[monthKey] = { arrecadado: 0, gasto: 0 }
  }
  groupedByMonth[monthKey].gasto += Number(compra.valortotal)
})

//
for (const [month, data] of Object.entries(groupedByMonth)) {
  // Calcular o Lucro Bruto (LB)
  console.log(data)
  data.lb = data.arrecadado - data.gasto

  // Calcular o Custo de Funcionário (FP)
  const fp = await fetch(
    "https://breno-papelaria.onrender.com/funcionarios/findAll"
  )
    .then((res) => res.json())
    .then((res) => res.reduce((total, item) => total + item.salario, 0))
  data.fp = fp

  // Calcular o Custo de Matéria Prima (CMAT) - 10% a 20% do LB
  data.cmat = data.lb * (Math.random() * 0.1 + 0.1)

  // Calcular o Custo de Manutenção (CMAN) - 20% a 30% do LB
  data.cman = data.lb * (Math.random() * 0.1 + 0.2)

  // Calcular o Lucro Líquido (LL)
  data.ll = data.lb - data.fp - data.cmat - data.cman
  const tr = document.createElement("tr")
  fields.forEach((field) => {
    const td = document.createElement("td")
    if (field === "Mês")
      td.textContent = MESES.find((mes) => mes.number === Number(month)).name
    if (field === "Vendas") td.textContent = data.arrecadado.toFixed(2)
    if (field === "Compras") td.textContent = data.gasto.toFixed(2)
    if (field === "FP") td.textContent = data.fp.toFixed(2)
    if (field === "CMAT") td.textContent = data.cmat.toFixed(2)
    if (field === "CMAN") td.textContent = data.cman.toFixed(2)
    if (field === "Lucro Bruto") td.textContent = data.lb.toFixed(2)
    if (field === "Lucro Liquido") td.textContent = data.ll.toFixed(2)
    tr.appendChild(td)
  })
  tbody.appendChild(tr)
}
//
table.appendChild(thead)
table.appendChild(tbody)
tableSection.appendChild(table)

const filter = document.getElementById("filter")
filter.addEventListener("click", async (e) => {
  e.preventDefault()
  minDate > maxDate
    ? alert("Data de inicio não pode ser maior que data de fim")
    : getData(minDate, maxDate)
})

// Declare the chart dimensions and margins.
const width = 640
const height = 400
const marginTop = 20
const marginRight = 20
const marginBottom = 30
const marginLeft = 40

const createChart = async () => {
  const data = await getData(minDate, maxDate)
  const x = d3.scaleUtc(
    d3.extent(data, (d) => d.createdAt),
    [marginLeft, width - marginRight]
  )

  const y = d3.scaleLinear(
    [0, d3.max(data, (d) => d.valortotal)],
    [height - marginBottom, marginTop]
  )

  console.log(data)

  const line = d3
    .line()
    .x((d) => x(d.createdAt))
    .y((d) => y(Number(d.valortotal)))

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;")

  // Add the x-axis.
  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0)
    )

  // Add the y-axis, remove the domain line, add grid lines and a label.
  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Daily close ($)")
    )

  svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line(data))
  // Append the SVG element.
  const container = document.querySelector(".chart")

  container.append(svg.node())
}
createChart()
