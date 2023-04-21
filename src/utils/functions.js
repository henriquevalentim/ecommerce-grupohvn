export function getFirstLetterOfName(name) {
  if (name) {
    return name[0]
  }
  return name
}

export function formatPrice(price) {
  try {
    if (price) {
      return price.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      })
    }
  } catch (error) {
    console.log(error)
    return price
  }
}

export function limitText(text, maxCaracter = 40) {
  try {
    if (text?.length < maxCaracter) {
      return text
    }
    return text.substr(0, maxCaracter) + '...'
  } catch (error) {
    console.log(error)
    return text
  }
}
