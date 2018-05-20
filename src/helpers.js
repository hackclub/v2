import createEmojiRegex from 'emoji-regex'

export const dt = d => new Date(d).toLocaleDateString()

const year = new Date().getFullYear()
export const tinyDt = d =>
  dt(d)
    .replace(`/${year}`, '')
    .replace(`${year}-`, '')

// based on https://github.com/withspectrum/spectrum/blob/alpha/src/helpers/utils.js#L146
export const timeSince = (previous, current) => {
  const msPerSecond = 1000
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerYear = msPerDay * 365

  const elapsed =
    (current ? new Date(current) : new Date()) - new Date(previous)

  if (elapsed < msPerMinute) {
    return '< 1m'
  } else if (elapsed < msPerHour) {
    const now = Math.round(elapsed / msPerMinute)
    return `${now}m`
  } else if (elapsed < msPerDay) {
    const now = Math.round(elapsed / msPerHour)
    return `${now}h`
  } else if (elapsed < msPerYear) {
    const now = Math.round(elapsed / msPerDay)
    return `${now}d`
  } else {
    const now = Math.round(elapsed / msPerYear)
    return `${now}y`
  }
}

// via https://github.com/withspectrum/spectrum/blob/alpha/src/helpers/utils.js#L58
const originalEmojiRegex = createEmojiRegex()
const regex = new RegExp(
  `^(${originalEmojiRegex.toString().replace(/\/g$/, '')}|\\s)+$`
)
export const onlyContainsEmoji = text => regex.test(text)
