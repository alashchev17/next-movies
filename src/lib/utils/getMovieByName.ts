import type { Movie } from '@/types'

export const getMovieByName = async (name: string) => {
  const response = await fetch('https://raw.githubusercontent.com/theapache64/top250/master/top250_min.json')
  const movies: Movie[] = await response.json()
  // return movies.find((movie) => movie.name === name) ? movies.find((movie) => movie.name === name) : null
  return movies.find((movie) => movie.name === name) ? movies.find((movie) => movie.name === name) : false
}
