const header = document.getElementById("header")
header.innerHTML = await fetch("../../../components/header-crud.html").then(
  (res) => res.text()
)

const footer = document.getElementById("footer")
footer.innerHTML = await fetch("../../../components/footer-crud.html").then(
  (res) => res.text()
)

document.addEventListener("submit", (event) => {
  event.preventDefault()
})

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

//#############################################
async function getCompras() {
  try {
    const response = await fetch(
      "https://breno-papelaria.onrender.com/vendas/findAll"
    ).then((res) => res.json())
    return response
  } catch (err) {
    console.log(err)
    return
  }
}

async function getFornecedores() {
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

async function getItemCompras() {
  try {
    const response = await fetch(
      "https://breno-papelaria.onrender.com/itens_venda/findAll"
    ).then((res) => res.json())
    return response
  } catch (err) {
    console.log(err)
    return
  }
}

const compras = await getCompras()
const produtos = await getFornecedores()
const itemCompras = await getItemCompras()
//##############################################

const section = document.querySelector("main > section")
const table = document.createElement("table")
const thead = document.createElement("thead")
const fields = [
  "id_venda",
  "id_cli",
  "id_func",
  "formapagamento",
  "valortotal",
  "mes",
]

//##############################################

fields.forEach((field) => {
  const th = document.createElement("th")
  th.innerHTML = field
  thead.appendChild(th)
})
table.appendChild(thead)

table.setAttribute("border", "1")

const tbody = document.createElement("tbody")
Array.isArray(compras)
  ? compras.forEach((Venda) => {
      const tr = document.createElement("tr")
      fields.forEach((field) => {
        const td = document.createElement("td")
        td.innerHTML = Venda[field]
        tr.appendChild(td)
      })
      tbody.appendChild(tr)
    })
  : null
table.appendChild(tbody)
section.appendChild(table)

//##############################################

const tableItem = document.createElement("table")
const theadItem = document.createElement("thead")
const itemFields = [
  "id_itensv",
  "id_prod",
  "id_venda",
  "id_func",
  "quantidade",
  "preco",
]

itemFields.forEach((field) => {
  const th = document.createElement("th")
  th.innerHTML = field
  theadItem.appendChild(th)
})
tableItem.appendChild(theadItem)
tableItem.setAttribute("border", "1")

const tbodyItem = document.createElement("tbody")
Array.isArray(itemCompras)
  ? itemCompras.forEach((Venda) => {
      const tr = document.createElement("tr")
      itemFields.forEach((field) => {
        const td = document.createElement("td")
        td.innerHTML = Venda[field]
        tr.appendChild(td)
      })
      tbodyItem.appendChild(tr)
    })
  : null

tableItem.appendChild(tbodyItem)
section.appendChild(tableItem)

//###
const listar = document.getElementById("listar")
listar.addEventListener("click", () => {
  window.location.reload()
})
//###

async function updateEstoque(produto, quantidade) {
  const id_prod = produto.id_prod
  const response = await fetch(
    "https://breno-papelaria.onrender.com/produtos/" + id_prod,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_forn: produto.id_forn,
        nome: produto.nome,
        preco: produto.preco,
        estoque: produto.quantidade - quantidade,
      }),
    }
  )

  if (response.ok) {
    Toastify({
      text: "Estoque atualizado",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast()
  }
}

const cadastrar = document.getElementById("cadastrar")
cadastrar.addEventListener("click", async () => {
  const form = document.createElement("form")
  form.setAttribute("method", "post")
  fields.forEach(async (field) => {
    if (field === "id_venda") return
    if (field === "valortotal") return
    if (field === "id_cli") {
      const label = document.createElement("label")
      label.innerHTML = "Cliente"
      const select = document.createElement("select")
      const option = document.createElement("option")
      option.setAttribute("value", "")
      option.setAttribute("selected", "true")
      option.innerHTML = "Selecione um cliente"
      select.appendChild(option)
      const div = document.createElement("div")
      div.appendChild(label)
      div.appendChild(select)
      form.appendChild(div)
      select.setAttribute("name", field)
      select.setAttribute("id", field)
      const response = await fetch(
        "https://breno-papelaria.onrender.com/clientes/findAll"
      ).then((res) => res.json())
      response.map((cliente) => {
        const option = document.createElement("option")
        option.setAttribute("value", cliente.id_cli)
        option.innerHTML = cliente.nome
        select.appendChild(option)
      })
    } else if (field === "id_func") {
      const label = document.createElement("label")
      label.innerHTML = "Funcionário"
      const select = document.createElement("select")
      const option = document.createElement("option")
      option.setAttribute("value", "")
      option.setAttribute("selected", "true")
      option.innerHTML = "Selecione um funcionario"
      select.appendChild(option)
      const div = document.createElement("div")
      div.appendChild(label)
      div.appendChild(select)
      form.appendChild(div)
      select.setAttribute("name", field)
      select.setAttribute("id", field)
      const response = await fetch(
        "https://breno-papelaria.onrender.com/funcionarios/findAll"
      ).then((res) => res.json())
      response.map((funcionario) => {
        const option = document.createElement("option")
        option.setAttribute("value", funcionario.id_func)
        option.innerHTML = funcionario.nome
        select.appendChild(option)
      })
    } else if (field === "mes") {
      const label = document.createElement("label")
      label.innerHTML = "Mês"
      const select = document.createElement("select")
      const option = document.createElement("option")
      select.setAttribute("id", "mes")
      option.setAttribute("value", "")
      option.setAttribute("selected", "true")
      option.innerHTML = "Selecione um mês"
      select.appendChild(option)
      MESES.map((mes) => {
        const option = document.createElement("option")
        option.setAttribute("value", mes)
        option.innerHTML = mes
        select.appendChild(option)
      })
      const div = document.createElement("div")
      div.appendChild(label)
      div.appendChild(select)
      form.appendChild(div)
    } else {
      const label = document.createElement("label")
      label.innerHTML = field
      const input = document.createElement("input")
      const div = document.createElement("div")
      input.setAttribute("type", "text")
      input.setAttribute("name", field)
      input.setAttribute("id", field)
      input.setAttribute("placeholder", field)
      div.appendChild(label)
      div.appendChild(input)
      form.appendChild(div)
    }
  })
  const label = document.createElement("label")
  label.innerHTML = "Produtos"
  const ul = document.createElement("ul")
  const div = document.createElement("div")
  div.appendChild(label)
  div.appendChild(ul)
  form.appendChild(div)
  produtos.map((produto) => {
    const li = document.createElement("li")
    const label = document.createElement("label")

    const input = document.createElement("input")
    const checkmark = document.createElement("span")
    input.setAttribute("type", "checkbox")
    input.setAttribute("name", produto.nome)
    input.setAttribute("value", produto.id_prod)
    input.setAttribute("id", produto.id_prod)
    label.appendChild(input)
    label.appendChild(checkmark)
    li.appendChild(label)
    const img = document.createElement("img")
    img.setAttribute("src", produto.imagem)
    label.appendChild(img)
    li.appendChild(document.createTextNode(produto.nome))
    ul.appendChild(li)
  })

  const sectionBoxes = document.createElement("div")
  form.appendChild(sectionBoxes)

  document.addEventListener("change", (event) => {
    if (event.target.matches('input[type="checkbox"]')) {
      sectionBoxes.innerHTML = ""
      const checkboxes = document.querySelectorAll('input[type="checkbox"]')
      const checkeds = Array.from(checkboxes).filter(
        (checkbox) => checkbox.checked
      )

      checkeds.forEach((checkbox) => {
        const div = document.createElement("div")
        div.classList.add("products")
        const label = document.createElement("label")
        const input = document.createElement("input")
        input.setAttribute("type", "number")
        input.min = 1
        input.setAttribute("required", "true")
        input.setAttribute("id", checkbox.id)
        input.setAttribute("placeholder", "Quantidade de itens")
        div.appendChild(label)
        label.innerHTML = checkbox.name
        div.appendChild(input)
        sectionBoxes.appendChild(div)
      })
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
    const produtos = await getFornecedores()

    //venda
    const idCliente = document.querySelector("#id_cli").value
    const idFunc = document.querySelector("#id_func").value

    //item_venda
    const itemVendaProdutosChecks = document.querySelectorAll(
      "input[type=checkbox]"
    )
    const itemVendaProdutosCheckeds = Array.from(
      itemVendaProdutosChecks
    ).filter((item) => item.checked)

    const itemVendaProdutos = itemVendaProdutosCheckeds.map(
      (item) => produtos[item.id - 1]
    )

    const itemVendaQuantidades = document.querySelectorAll("input[type=number]")
    let total = 0
    itemVendaProdutos.map((produto, index) => {
      const quantidade = itemVendaQuantidades[index].value
      total += produto.preco * quantidade
    })

    const formapagamento = document.querySelector("#formapagamento").value
    const mes = document.querySelector("#mes").value
    const vendaData = {
      id_cli: idCliente,
      id_func: idFunc,
      formapagamento,
      valortotal: total,
      mes: mes,
    }

    console.log(vendaData)

    try {
      const response = await fetch(
        "https://breno-papelaria.onrender.com/vendas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vendaData),
        }
      )
      if (response.ok) {
        itemVendaProdutos.map(async (produto, index) => {
          await updateEstoque(produto, itemVendaQuantidades[index].value)
        })
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
        const venda = await response.json()
        itemVendaProdutos.map(async (produto, index) => {
          const itemVenda = {
            id_prod: produto.id_prod,
            id_venda: venda.id_venda,
            id_func: idFunc,
            quantidade: itemVendaQuantidades[index].value,
            preco: produto.preco * itemVendaQuantidades[index].value,
          }
          await fetch("https://breno-papelaria.onrender.com/itens_venda", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(itemVenda),
          })
        })
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      }
    } catch (err) {
      console.log(err)
      Toastify({
        text: err,
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
  <p>Venda: ${id}</p>`
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
      "https://breno-papelaria.onrender.com/vendas/" + id,
      {
        method: "DELETE",
      }
    )
    if (response.ok) {
      Toastify({
        text: "Venda excluido com sucesso!",
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
    fields.forEach(async (field, indice) => {
      if (field === "id_venda") return
      if (field === "valortotal") return
      if (field === "id_cli") {
        const label = document.createElement("label")
        label.innerHTML = "Cliente"
        const select = document.createElement("select")
        const option = document.createElement("option")
        option.setAttribute("value", "")
        option.innerHTML = "Selecione um cliente"
        select.appendChild(option)
        const div = document.createElement("div")
        div.appendChild(label)
        div.appendChild(select)
        form.appendChild(div)
        select.setAttribute("name", field)
        select.setAttribute("id", field)
        const response = await fetch(
          "https://breno-papelaria.onrender.com/clientes/findAll"
        ).then((res) => res.json())
        response.map((cliente) => {
          const option = document.createElement("option")
          option.setAttribute("value", cliente.id_cli)
          option.innerHTML = cliente.nome
          select.appendChild(option)
        })
      } else if (field === "id_func") {
        const label = document.createElement("label")
        label.innerHTML = "Funcionário"
        const select = document.createElement("select")
        const option = document.createElement("option")
        option.setAttribute("value", "")
        option.setAttribute("selected", "true")
        option.innerHTML = "Selecione um funcionario"
        select.appendChild(option)
        const div = document.createElement("div")
        div.appendChild(label)
        div.appendChild(select)
        form.appendChild(div)
        select.setAttribute("name", field)
        select.setAttribute("id", field)
        const response = await fetch(
          "https://breno-papelaria.onrender.com/funcionarios/findAll"
        ).then((res) => res.json())
        response.map((funcionario) => {
          const option = document.createElement("option")
          option.setAttribute("value", funcionario.id_func)
          option.innerHTML = funcionario.nome
          select.appendChild(option)
        })
      } else {
        const label = document.createElement("label")
        label.innerHTML = field
        const input = document.createElement("input")
        const div = document.createElement("div")
        input.setAttribute("type", "text")
        input.setAttribute("name", field)
        input.setAttribute("id", field)
        input.setAttribute("value", tr.children[indice].innerHTML)
        input.setAttribute("placeholder", field)
        div.appendChild(label)
        div.appendChild(input)
        form.appendChild(div)
      }
    })
    const label = document.createElement("label")
    label.innerHTML = "Produtos"
    const ul = document.createElement("ul")
    const div = document.createElement("div")
    div.appendChild(label)
    div.appendChild(ul)
    form.appendChild(div)
    produtos.map((produto) => {
      const li = document.createElement("li")
      const label = document.createElement("label")

      const input = document.createElement("input")
      const checkmark = document.createElement("span")
      input.setAttribute("type", "checkbox")
      input.setAttribute("name", produto.nome)
      input.setAttribute("value", produto.id_prod)
      input.setAttribute("id", produto.id_prod)
      label.appendChild(input)
      label.appendChild(checkmark)
      li.appendChild(label)
      const img = document.createElement("img")
      img.setAttribute("src", produto.imagem)
      label.appendChild(img)
      li.appendChild(document.createTextNode(produto.nome))
      ul.appendChild(li)
    })

    const sectionBoxes = document.createElement("div")
    form.appendChild(sectionBoxes)
    document.addEventListener("change", (event) => {
      if (event.target.matches('input[type="checkbox"]')) {
        sectionBoxes.innerHTML = ""
        const checkboxes = document.querySelectorAll('input[type="checkbox"]')
        const checkeds = Array.from(checkboxes).filter(
          (checkbox) => checkbox.checked
        )

        checkeds.forEach((checkbox) => {
          const div = document.createElement("div")
          div.classList.add("products")
          const label = document.createElement("label")
          const input = document.createElement("input")
          input.setAttribute("type", "number")
          input.min = 1
          input.setAttribute("required", "true")
          input.setAttribute("id", checkbox.id)
          input.setAttribute("placeholder", "Quantidade de itens")
          div.appendChild(label)
          label.innerHTML = checkbox.name
          div.appendChild(input)
          sectionBoxes.appendChild(div)
        })
      }
    })
    const button = document.createElement("button")
    button.setAttribute("type", "submit")
    button.innerHTML = "Editar"
    button.addEventListener("click", async (event) => {
      event.preventDefault()
      const formData = new FormData(event.target.form)
      const data = Object.fromEntries(formData)
      const response = await fetch(
        "https://breno-papelaria.onrender.com/vendas/" + id,
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
