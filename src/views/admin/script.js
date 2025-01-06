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

const getData = async (minDate, maxDate) => {
  const data = await fetch(
    "http://localhost:3000/vendas/findByDate?minDate=" +
      minDate.value +
      "&maxDate=" +
      maxDate.value
  ).then((res) => res.json())
  return data
}

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
