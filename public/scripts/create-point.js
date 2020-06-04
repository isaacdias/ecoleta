function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {

        for (state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

        }

    })
}

populateUfs()

function getCities(event) {
    citySelect = document.querySelector("select[name=city]")
    stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value 

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json())
    .then( cities => {
        for (city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")


for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    
    const itemLi = event.target

    // add or remove classe 
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    // verificar se existem item selecionados, se sim 
    // pegar os item selecionados 
    const alreadySelected = selectedItems.findIndex( function (item) {
        const itemFound = item == itemId
        return itemFound
    })
    // se estiver selecionado
    if( alreadySelected >= 0 ) {
        // tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se mão estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)
    }
    
    collectedItems.value = selectedItems
}