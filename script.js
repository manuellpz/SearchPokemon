const txtSearch = document.querySelector('#txtSearch')
const pkmImage = document.querySelector('#pkmImage')
const pkmName = document.querySelector('#pkmName')
const listTypes = document.querySelector('#listTypes')
const pkmWeight = document.querySelector('#pkmWeight')
const pkmHeight = document.querySelector('#pkmHeight')

const allTypes = {
	fire:'red',
	water:'blue',
	electric:'orange',
	grass:'green',
	dark:'black',
	psychic:'purple',
	rock:'#a38c21',
	poison:'#b97fc9',
	bug:'#729f3f',
	ghost:'#7b62a3',
	dragon:'#f16e57',
	ice:'#51c4e7',
	normal:'gray',
	fighting:'brown'
}


txtSearch.addEventListener('keyup', async (e) => {
	if(e.keyCode === 13){
		const data = await getPKMInfo(e.target.value)
		pkmImage.src = `${data.sprites.other.dream_world.front_default}`
		
		pkmName.textContent = data.name
		listTypes.innerHTML = ''
		
		data.types.map(types => {
			listTypes.innerHTML += `<li>${types.type.name}</li>`
		})
		const typesPKM = shadowType(pkmImage,getTypeName())
		
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

const shadowType = (item,types) => {
	let colors = [] 

	types.map(type => {
		colors.push(allTypes[type])
	})
	item.style.filter = `drop-shadow(5px 10px 25px ${colors[0]})`

	return colors
}