export const getMovies = async () => {
  const response = await fetch('https://raw.githubusercontent.com/theapache64/top250/master/top250_min.json')
  return await response.json()
}
