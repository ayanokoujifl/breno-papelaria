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
  const email = document.getElementById("email")
  const password = document.getElementById("password")
  if (email.value === "") {
    email.setAttribute("placeholder", "Insira seu user ou email")
    email.classList.add("placeholder:text-red-500")
  } else {
    if (password.value === "") {
      password.setAttribute("placeholder", "Insira sua senha")
      password.classList.add("placeholder:text-red-500")
    } else {
      if (email.value === "admin" && password.value === "admin") {
        window.location.href = "/admin"
      } else {
        const response = await fetch(
          "http://localhost:3000/clientes/findbycpf/" + email.value
        )
        if (response.status === 200) {
          if (password.value === email.value.slice(0, 6)) {
            window.location.href = "/cliente?cpf=" + email.value
          }
        }
      }
    }
  }
})
