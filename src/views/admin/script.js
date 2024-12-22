import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"

const header = document.getElementById("header")
header.innerHTML = await fetch("../components/header.html").then((res) =>
  res.text()
)

const footer = document.getElementById("footer")
footer.innerHTML = await fetch("../components/footer.html").then((res) =>
  res.text()
)

const today = new Date()
const lastWeek = new Date(today.getTime() - 7 * 24 * 3600 * 1000)
console.log(lastWeek.toLocaleDateString("pt-BR"))

// Declare the chart dimensions and margins.
const width = 640
const height = 400
const marginTop = 20
const marginRight = 20
const marginBottom = 30
const marginLeft = 40

// Declare the x (horizontal position) scale.
const x = d3
  .scaleUtc()
  .domain([lastWeek, today])
  .range([marginLeft, width - marginRight])

// Declare the y (vertical position) scale.
const y = d3
  .scaleLinear()
  .domain([0, 100])
  .range([height - marginBottom, marginTop])

// Create the SVG container.
const svg = d3.create("svg").attr("width", width).attr("height", height)

// Add the x-axis.
svg
  .append("g")
  .attr("transform", `translate(0,${height - marginBottom})`)
  .call(d3.axisBottom(x))

// Add the y-axis.
svg
  .append("g")
  .attr("transform", `translate(${marginLeft},0)`)
  .call(d3.axisLeft(y))

// Append the SVG element.
const container = document.querySelector(".chart")

container.append(svg.node())
