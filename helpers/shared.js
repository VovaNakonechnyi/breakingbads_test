import cities from 'cities.json'
export function capitalizeEachWord(value) {
  if (!value) return ''
  value = value.toString()
  return value.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
}
export function getLatAndLng({ country = 'US', city = 'Albuquerque' }) {
  return cities.filter((item) => item.country === country && item.name === city)
}

export function slicedArray(arr = [], times = 1) {
  const slicedArr = []
  let start = 0
  let end = times
  const length = Math.ceil(arr.length / times)
  for (let i = 0; i < length; i++) {
    slicedArr.push(arr.slice(start, end))
    start += times
    end += times
  }
  return slicedArr
}

export function formattedArrayWithObjects(object = {}, ...props) {
  return Object.entries(object)
    .filter((item) => props.includes(item[0]))
    .reduce((accum, [key, val]) => {
      accum.push({ [key]: val })
      return accum
    }, [])
}
