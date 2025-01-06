const header = document.getElementById("header")
header.innerHTML = await fetch("../../../components/header-crud.html").then(
  (res) => res.text()
)

const footer = document.getElementById("footer")
footer.innerHTML = await fetch("../../../components/footer-crud.html").then(
  (res) => res.text()
)

export async function getProdutos() {
  try {
    const response = await fetch(
      "https://breno-papelaria.onrender.com/produtos/findAll"
    ).then((res) => res.json())
    return response
  } catch (err) {
    console.log(err)
    return
  }
}
const produtos = await getProdutos()

//##############################################

const section = document.querySelector("main > section")
const table = document.createElement("table")
const thead = document.createElement("thead")
const fields = ["id_prod", "id_forn", "nome", "preco", "estoque", "imagem"]

//##############################################

fields.forEach((field) => {
  if (field === "createdAt" || field === "updatedAt") return
  const th = document.createElement("th")
  th.innerHTML = field
  thead.appendChild(th)
})
table.appendChild(thead)

table.setAttribute("border", "1")

const tbody = document.createElement("tbody")
Array.isArray(produtos)
  ? produtos.forEach((Produto) => {
      const tr = document.createElement("tr")
      fields.forEach((field) => {
        const td = document.createElement("td")
        td.innerHTML = Produto[field]
        tr.appendChild(td)
      })
      tbody.appendChild(tr)
    })
  : null
table.appendChild(tbody)
section.appendChild(table)

//###
const listar = document.getElementById("listar")
listar.addEventListener("click", () => {
  window.location.reload()
})
//###
const cadastrar = document.getElementById("cadastrar")
cadastrar.addEventListener("click", () => {
  const form = document.createElement("form")
  form.setAttribute("method", "post")
  fields.forEach(async (field) => {
    if (field === "id_prod") return
    if (field === "id_forn") {
      const label = document.createElement("label")
      label.innerHTML = "Fornecedor"
      const select = document.createElement("select")
      const option = document.createElement("option")
      option.setAttribute("value", "")
      option.innerHTML = "Selecione um fornecedor"
      select.appendChild(option)
      const div = document.createElement("div")
      div.appendChild(label)
      div.appendChild(select)
      form.appendChild(div)
      select.setAttribute("name", field)
      select.setAttribute("id", field)
      const response = await fetch(
        "https://breno-papelaria.onrender.com/fornecedores/findAll"
      ).then((res) => res.json())
      response.map((fornecedor) => {
        const option = document.createElement("option")
        option.setAttribute("value", fornecedor.id_forn)
        option.innerHTML = fornecedor.nome
        select.appendChild(option)
      })
    } else {
      const label = document.createElement("label")
      label.innerHTML = field
      const input = document.createElement("input")
      const div = document.createElement("div")
      input.setAttribute("type", "text")
      input.setAttribute("name", field)
      input.setAttribute("placeholder", field)
      div.appendChild(label)
      div.appendChild(input)
      form.appendChild(div)
    }
  })
  const button = document.createElement("button")
  button.setAttribute("type", "submit")
  button.innerHTML = "Cadastrar"
  form.appendChild(button)
  section.innerHTML = ""
  section.appendChild(form)
  button.addEventListener("click", async (e) => {
    e.preventDefault()
    const form = document.querySelector("form")
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    try {
      const response = await fetch(
        "https://breno-papelaria.onrender.com/produtos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
      if (response.ok) {
        Toastify({
          text: "Cadastro concluído com sucesso!",
          duration: 3000,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to bottom, #166534, #064e3b)",
          },
        }).showToast()
      }
    } catch (err) {
      Toastify({
        text: "Erro ao cadastrar Produto!",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to bottom, #b91c1c, #7f1d1d)",
        },
      }).showToast()
    }
  })
})
//###
const body = document.querySelector("body")

const trClicked = (event) => {
  const tr = event.target.closest("tr")
  const id = tr.children[0].innerHTML
  const nome = tr.children[1].innerHTML
  const div = document.createElement("div")
  div.setAttribute("id", "modal")
  const backModal = document.createElement("button")
  const buttonTrash = document.createElement("button")
  const buttonEdit = document.createElement("button")
  const trash = document.createElement("i")
  const pencil = document.createElement("i")
  backModal.setAttribute("id", "back-modal")
  backModal.innerHTML = "<i class='ph-bold ph-x'></i>"
  trash.setAttribute("class", "ph-fill ph-trash")
  pencil.setAttribute("class", "ph-duotone ph-pencil-simple")
  buttonTrash.appendChild(trash)
  buttonEdit.appendChild(pencil)
  const wrapper = document.createElement("div")
  wrapper.setAttribute("id", "wrapper")
  div.innerHTML = `
  <p>Produto: ${nome} - ${id}</p>`
  div.appendChild(wrapper)
  wrapper.appendChild(backModal)
  wrapper.appendChild(buttonTrash)
  wrapper.appendChild(buttonEdit)
  body.appendChild(div)
  backModal.addEventListener("click", () => {
    body.removeChild(div)
  })
  buttonTrash.addEventListener("click", async () => {
    const response = await fetch(
      "https://breno-papelaria.onrender.com/produtos/" + id,
      {
        method: "DELETE",
      }
    )
    if (response.ok) {
      Toastify({
        text: "Produto excluido com sucesso!",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to bottom, #b91c1c, #7f1d1d)",
        },
      }).showToast()
    }
    body.removeChild(div)
    setTimeout(() => {
      window.location.reload()
    }, 3000)
  })
  buttonEdit.addEventListener("click", () => {
    const form = document.createElement("form")
    form.setAttribute("method", "post")
    fields.forEach((field, indice) => {
      if (field === "id_prod") return
      const label = document.createElement("label")
      label.innerHTML = field
      const input = document.createElement("input")
      const formWrapper = document.createElement("div")
      input.setAttribute("type", "text")
      input.setAttribute("name", field)
      input.setAttribute("value", tr.children[indice].innerHTML)
      form.appendChild(label)
      form.appendChild(input)
      const x = document.createElement("i")
      x.setAttribute("class", "ph-bold ph-x close-form")
      form.appendChild(x)
      formWrapper.appendChild(form)
    })
    const button = document.createElement("button")
    button.setAttribute("type", "submit")
    button.innerHTML = "Editar"
    button.addEventListener("click", async (event) => {
      event.preventDefault()
      const formData = new FormData(event.target.form)
      const data = Object.fromEntries(formData)
      const response = await fetch(
        "https://breno-papelaria.onrender.com/produtos/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
      if (response.ok) {
        Toastify({
          text: "Cadastro atualizado com sucesso!",
          duration: 3000,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to bottom, #166534, #064e3b)",
          },
        }).showToast()
      }
      body.removeChild(div)
      body.removeChild(formWrapper)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    })
    form.appendChild(button)
    const formWrapper = document.createElement("div")
    formWrapper.setAttribute("id", "form-wrapper")
    formWrapper.appendChild(form)
    body.appendChild(formWrapper)
  })
}

table.addEventListener("click", trClicked)
const voltar = document.getElementById("voltar")
voltar &&
  voltar.addEventListener("click", () => {
    window.location.href = "/admin"
  })
