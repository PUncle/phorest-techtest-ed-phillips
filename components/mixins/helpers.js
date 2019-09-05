export const whitelistChars = string => {
  const regex = /[^a-zA-Z0-9_@. -]/gi
  return string.replace(regex, '')
}

export const getLastWord = term => {
  const termArray = term.split(' ')
  return termArray.pop()
}
