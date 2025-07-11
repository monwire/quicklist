// Selecionando elementos do DOM
const form = document.querySelector("form")
const input = document.querySelector("input")
const submitBtn = document.querySelector("button")
const list = document.querySelector("#list")
const warnings = document.querySelector("#warnings")

// Função que chama addItem
form.addEventListener("submit", (event) => {
  event.preventDefault()

  const inputValue = input.value

  if (inputValue === "") {
    alert("Você precisa digitar alguma coisa!")
  } else {
    addItem(inputValue)
    input.value = ""
  }
})

// Função que adiciona o novo item à lista
function addItem(inputValue) {
  const listItem = document.createElement("li")
  const itemBox = document.createElement("span")
  itemBox.classList.add("item")

  const checkbox = document.createElement("img")
  const trashIcon = document.createElement("img")
  const itemName = document.createElement("span")

  list.appendChild(listItem)
  listItem.appendChild(itemBox)
  itemBox.appendChild(checkbox)

  checkbox.classList.add("checkbox")
  checkbox.classList.add("list-icon")
  checkbox.src = "assets/icons/state-default.svg"

  itemBox.appendChild(itemName)
  itemName.innerHTML = inputValue
  listItem.appendChild(trashIcon)

  trashIcon.classList.add("delete")
  trashIcon.classList.add("list-icon")
  trashIcon.src = "assets/icons/trash-icon.svg"

  requestAnimationFrame(() => {
    listItem.style.opacity = "1"
  })

  // Funções para criar dinâmica do checkbox
  checkbox.addEventListener("mouseover", () => {
    if (checkbox.src.endsWith("assets/icons/state-default.svg")) {
      checkbox.src = "assets/icons/state-hover.svg"
    }
  })

  checkbox.addEventListener("mouseout", () => {
    if (checkbox.src.endsWith("assets/icons/state-hover.svg")) {
      checkbox.src = "assets/icons/state-default.svg"
    }
  })

  checkbox.addEventListener("click", () => {
    if (
      checkbox.src.endsWith(
        "assets/icons/state-hover.svg" || "assets/icons/state-default.svg"
      )
    ) {
      checkbox.src = "assets/icons/state-selected.svg"
    } else {
      checkbox.src = "assets/icons/state-hover.svg"
    }
  })

  // Adicionando evento de deletação de item da lista ao ícone de lixo
  trashIcon.addEventListener("click", () => deleteItem(listItem))
}

// Função que deleta item da lista e cria aviso de deleção
function deleteItem(item) {
  item.style.opacity = "0"
  setTimeout(() => {
    if (item.parentNode === list) {
      list.removeChild(item)
    }

    const warning = document.createElement("li")
    warning.classList.add("warning")

    const warningMessage = document.createElement("div")
    warningMessage.classList.add("warning-message")

    const warningIcon = document.createElement("img")
    warningIcon.src = "assets/icons/warning-circle-filled.svg"

    const warningText = document.createElement("span")
    warningText.classList.add("warning-text")
    warningText.innerHTML = "O item foi removido da lista"

    const deleteWarningBtn = document.createElement("img")
    deleteWarningBtn.src = "assets/icons/delete-small.svg"

    warnings.appendChild(warning)

    // Obrigando o navegador a esperar a transição após a criação do elemento warning
    requestAnimationFrame(() => {
      warning.style.opacity = "1"
    })
    warning.appendChild(warningMessage)
    warningMessage.appendChild(warningIcon)
    warningMessage.appendChild(warningText)
    warning.appendChild(deleteWarningBtn)

    // Adicionando evento de remover alerta de deleção ao botão de fechar
    deleteWarningBtn.addEventListener("click", () =>
      removeWarningMessage(warning)
    )
  }, 500)
}

// Função para remover mensagem de aviso de deleção
function removeWarningMessage(warning) {
  warning.style.opacity = "0"

  // Obrigando a espera de 500 ms para deleção do elemento (ocorre após a transição da opacidade)
  setTimeout(() => {
    if (warning.parentNode === warnings) {
      warnings.removeChild(warning)
    }
  }, 500)
}
