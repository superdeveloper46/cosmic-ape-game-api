const { MFA_LENGTH } = require("../../static")

const generateMFAToken = () => {
  const getRandomCharacter = (characters) => characters[Math.floor(Math.random() * characters.length)]

  let mfa = []
  for (let i = 0; i < MFA_LENGTH; i ++) {
    mfa[i] = getRandomCharacter('ABCDEFGHIJKLMNPQRSTUVWXYZ123456789')
  }
  
  return mfa.join('')
}

module.exports = generateMFAToken