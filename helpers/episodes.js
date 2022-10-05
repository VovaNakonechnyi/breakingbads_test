export function filterBySeasons(series) {
  const seasonsNumber = 5
  const seasonsArray = []
  for (let seasonNumber = 1; seasonNumber <= seasonsNumber; seasonNumber++) {
    seasonsArray.push(
      series.filter((item) => parseInt(item.season) === seasonNumber)
    )
  }
  return seasonsArray
}
