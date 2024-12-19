const eye = document.getElementById("eye")
const password = document.getElementById("password")
eye.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text"
    eye.classList.replace("ph-eye", "ph-eye-slash")
  } else {
    password.type = "password"
    eye.classList.replace("ph-eye-slash", "ph-eye")
  }
})

const button = document.getElementById("signin")

button.addEventListener("click", async (e) => {
  e.preventDefault()
  const cpf = document.getElementById("cpf")
  const cpfValue = String(cpf.value).replaceAll(".", "").replaceAll("-", "")
  const password = document.getElementById("password")
  if (cpf.value === "") {
    cpf.setAttribute("placeholder", "Insira seu user ou CPF")
    cpf.classList.add("placeholder:text-red-500")
  } else {
    if (password.value === "") {
      password.setAttribute("placeholder", "Insira sua senha")
      password.classList.add("placeholder:text-red-500")
    } else {
      if (cpfValue === "admin" && password.value === "admin") {
        window.location.href = "/admin"
      } else {
        const response = await fetch(
          "https://breno-papelaria.onrender.com/clientes/findbycpf/" + cpfValue
        )

        if (response.status === 200) {
          if (password.value === cpfValue.slice(0, 6)) {
            window.location.href = "/cliente?cpf=" + cpf.value
          }
        }
      }
    }
  }
})

const input = document.getElementById("cpf")
input.addEventListener("input", applyMask)

function applyMask(event) {
  const input = event.target
  let value = input.value

  if (/^admin$/i.test(value)) {
    input.value = value // Não faz nada, mantém a palavra "admin"
    return
  }

  if (/^[a-zA-Z]*$/i.test(value)) {
    input.value = value
    return
  }

  const numericValue = value.replace(/\D/g, "")

  if (numericValue.length <= 11) {
    const formattedValue = numericValue
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    input.value = formattedValue
  } else {
    input.value = value.slice(0, 14)
  }
}
