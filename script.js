const txtSearch = document.querySelector('#txtSearch')
const pkmImage = document.querySelector('#pkmImage')
const pkmName = document.querySelector('#pkmName')
const listTypes = document.querySelector('#listTypes')
const pkmWeight = document.querySelector('#pkmWeight')
const pkmHeight = document.querySelector('#pkmHeight')

const allTypes = {
	fire:'#f08030',
	water:'#6890f0',
	electric:'#f8d030',
	grass:'#78c850',
	dark:'#705848',
	psychic:'#f85888',
	rock:'#b8a038',
	poison:'#a040a0',
	bug:'#a8b820',
	ghost:'#705898',
	dragon:'#7038f8',
	ice:'#98d8d8',
	normal:'#a8a878',
	fighting:'#c03028',
	flying:'#a890f0',
	ground:'#e0c068',
	steel:'#b8b8d0'
}


txtSearch.addEventListener('keyup', async (e) => {
	if(e.keyCode === 13){
		const data = await getPKMInfo(e.target.value.toLowerCase())
		pkmImage.src = `${data.sprites.other.dream_world.front_default}`
		
		pkmName.textContent = data.name
		listTypes.innerHTML = ''
		
		data.types.map(types => {
			listTypes.innerHTML += `<li>${types.type.name}</li>`
		})
		const typesPKM = shadowType(pkmImage,getTypeName())
		paintType(listTypes)
		
		pkmHeight.textContent = `Height: ${(data.height/10)} mts.`
		pkmWeight.textContent = `Weight: ${(data.weight/10)} KG.`
		
		e.target.value = ''
		e.target.focus()
		
	}
	
})

const getTypeName = () => {
	let listTypes = []
	const list = document.querySelectorAll('#listTypes > li')

	list.forEach(value => {
		listTypes.push(value.textContent)
	})
	return listTypes

} 

const getPKMInfo = async (pkmName) => {
	const request = await fetch(` https://pokeapi.co/api/v2/pokemon/${pkmName}`)
	return await request.json()
}

const paintType = (lista) => {

	lista.childNodes.forEach(li => {
		li.style.background = `${allTypes[li.outerText]}`
	})
}

const shadowType = (item,types) => {
	let colors = [] 

	types.map(type => {
		colors.push(allTypes[type])
	})
	item.style.filter = `drop-shadow(5px 10px 25px ${colors[0]})`

	return colors
}