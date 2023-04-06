export function getFirstLetterOfName(name) {
  return name[0]
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
