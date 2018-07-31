import createEmojiRegex from 'emoji-regex'

export const dt = d => new Date(d).toLocaleDateString()

const year = new Date().getFullYear()
export const tinyDt = d =>
  dt(d)
    .replace(`/${year}`, '')
    .replace(`${year}-`, '')

// based on https://github.com/withspectrum/spectrum/blob/alpha/src/helpers/utils.js#L146
export const timeSince = (previous, current = new Date(), absoluteDuration = false) => {
  const msPerSecond = 1000
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerYear = msPerDay * 365

  const elapsed = new Date(current) - new Date(previous)

  let humanizedTime
  if (elapsed < msPerMinute) {
    humanizedTime ='< 1m'
  } else if (elapsed < msPerHour) {
    const now = Math.round(elapsed / msPerMinute)
    humanizedTime = `${now}m`
  } else if (elapsed < msPerDay) {
    const now = Math.round(elapsed / msPerHour)
    humanizedTime = `${now}h`
  } else if (elapsed < msPerYear) {
    const now = Math.round(elapsed / msPerDay)
    humanizedTime = `${now}d`
  } else {
    const now = Math.round(elapsed / msPerYear)
    humanizedTime = `${now}y`
  }

  if (absoluteDuration) {
    return humanizedTime
  } else {
    return elapsed > 0 ? `${humanizedTime} ago` : `in ${humanizedTime}`
  }
}

// via https://github.com/withspectrum/spectrum/blob/alpha/src/helpers/utils.js#L58
const originalEmojiRegex = createEmojiRegex()
const regex = new RegExp(
  `^(${originalEmojiRegex.toString().replace(/\/g$/, '')}|\\s)+$`
)
export const onlyContainsEmoji = text => regex.test(text)

function formatChunk(type, date) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  const months = [
    'January',
    'Febuary',
    'March',
    ' April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  switch (type) {
    case 'dddd':
      return days[date.getDay()]
    case 'ddd':
      return formatChunk('dddd', date).slice(0, 3)
    case 'dd':
      return ('00' + formatChunk('d', date)).slice(-2)
    case 'd':
      return date.getDate()
    case 'mmmm':
      return months[date.getMonth()]
    case 'mmm':
      return formatChunk('mmmm', date).slice(0, 3)
    case 'mm':
      return ('00' + formatChunk('m', date)).slice(-2)
    case 'm':
      return (date.getMonth() + 1).toString()
    case 'yyyy':
      return date.getFullYear().toString()
    case 'yy':
      return formatChunk('yyyy', date).slice(-2)
  }
}
export const formatDate = (format, date, divider = ' ') => {
  return format
    .split(divider)
    .map(chunk => formatChunk(chunk, new Date(date)))
    .join(divider)
}
