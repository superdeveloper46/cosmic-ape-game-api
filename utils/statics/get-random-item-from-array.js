const getRandomItemFromArray = items => {
  return items[Math.floor(Math.random() * items.length)]
}

module.exports = getRandomItemFromArray