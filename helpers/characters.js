export function formattedName(name = '') {
  return name.split(' ').join('+')
}

export function characterOccupation(occupation = []) {
  return occupation.join(', ')
}

export function descriptionDestruction(data = {}) {
  const { birthday = '', portrayed = '', status = '' } = data
  let { occupation = [] } = data
  occupation = characterOccupation(occupation)
  return {
    birthday,
    occupation,
    portrayed,
    status,
  }
}
export function addToFavourite(character) {
  const favourites = JSON.parse(localStorage.getItem('favourites'))
  if (!favourites.find((item) => item.char_id === character.char_id)) {
    favourites.push(character)
    localStorage.setItem('favourites', JSON.stringify(favourites))
    return favourites
  }
}
export function removeFromFavourite(id) {
  const favourites = JSON.parse(localStorage.getItem('favourites'))
  const characters = favourites.filter((character) => character.char_id !== id)
  localStorage.setItem('favourites', JSON.stringify(characters))
  return characters
}
