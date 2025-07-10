// Selecionando elementos do DOM
const form = document.querySelector("form")
const input = document.querySelector("input")
const submitBtn = document.querySelector("button")
const list = document.querySelector("#list")

// Função que chama addItem
form.addEventListener("submit", (event) => {
  event.preventDefault()

  const inputValue = input.value

  if (inputValue === "") {
    alert("Você precisa digitar alguma coisa!")
  } else {
    addItem(inputValue)
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
}
