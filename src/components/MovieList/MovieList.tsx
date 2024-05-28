'use client'

import { Movie } from '@/types'
import { MovieListItem } from '@/components/MovieListItem'
import { MovieFilter } from '../MovieFilter'
import { useState } from 'react'
import { Heading } from '@/components/Heading'

interface MovieListProps {
  movies: Movie[]
}

export const MovieList = ({ movies }: MovieListProps) => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies.sort((a, b) => a.rating - b.rating)) // temporally
  return (
    <div className="flex flex-col gap-3">
      <MovieFilter movies={movies} setFilteredMovies={setFilteredMovies} />
      {filteredMovies.length > 0 ? (
        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:justify-around">
          {filteredMovies.map((movie) => (
            <MovieListItem key={movie.name} movie={movie} />
          ))}
        </div>
      ) : (
        <Heading level={2} text="No movies found by your query!" />
      )}
    </div>
  )
}
