const getMillisecondsToExpInEpoch = (expiresIn: string) => {
  const token: string = expiresIn
  const unit = token[token.length - 1]
  const number = parseInt(token.slice(0, token.length - 1))

  let secondsToExp = 0
  switch (unit) {
    case 'm': // Minute
      secondsToExp = number * 60
      break
    case 'h': // Hour
      secondsToExp = number * 60 * 60
      break
    case 'd': // Day
      secondsToExp = number * 60 * 60 * 24
      break
    default:
      secondsToExp = number
      break
  }
  const millSecondsToExp = secondsToExp * 1000
  const dateOfExp = Date.now() + millSecondsToExp
  return dateOfExp
}

export default getMillisecondsToExpInEpoch
