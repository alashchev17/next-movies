'use client'

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import type { Movie } from '@/types'
import { Button } from '@/components/Button'
import { SearchInput } from '../SearchInput'

interface MovieFilterProps {
  movies: Movie[]
  setFilteredMovies: Dispatch<SetStateAction<Movie[]>>
}

export const MovieFilter = ({ movies, setFilteredMovies }: MovieFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  useEffect(() => {
    const filteredMovies = movies.filter((movie) => movie.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredMovies(filteredMovies)
  }, [searchTerm, movies, setFilteredMovies])

  const sortMovies = (criteria: string, order: 'asc' | 'desc'): void => {
    const sortedMovies = [...movies].sort((a, b) => {
      if (criteria === 'rating') {
        return order === 'asc' ? a.rating - b.rating : b.rating - a.rating
      } else if (criteria === 'name') {
        return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      }
      return 0
    })

    console.log(`${sortedMovies[0].name}`)
    setFilteredMovies(sortedMovies)
    localStorage.setItem('sort', `${criteria}-${order}`)
  }

  const handleSort = (criteria: string, order: 'asc' | 'desc') => {
    const currentSort = localStorage.getItem('sort')
    if (currentSort !== `${criteria}-${order}`) {
      sortMovies(criteria, order)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // I wondered how to implement this better, but I couldn't figure it out.
  // by the way, it seems to be working fine

  // it's not the best implementation, because we can't sort by name and by rating together
  // we can choose only one option at a time

  return (
    <div className="flex flex-col gap-3 md:items-start lg:flex-row lg:flex-wrap">
      <Button
        variant="primary"
        text={isFilterVisible ? 'Hide filter options' : 'Show filter options'}
        onClick={() => setIsFilterVisible(!isFilterVisible)}
      />
      <div
        className={`${
          isFilterVisible ? 'opacity-100 translate-y-0 h-auto visible' : 'non-visible opacity-0 -translate-y-10 h-0'
        } transition-all ease-in-out duration-500 flex flex-col gap-1 lg:items-center lg:flex-row lg:justify-between lg:gap-3`}
      >
        <SearchInput type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearchChange} />
        <Button variant="primary" text="Rating Ascending" onClick={() => handleSort('rating', 'asc')} />
        <Button variant="primary" text="Rating Descending" onClick={() => handleSort('rating', 'desc')} />
        <Button variant="primary" text="Name Ascending" onClick={() => handleSort('name', 'asc')} />
        <Button variant="primary" text="Name Descending" onClick={() => handleSort('name', 'desc')} />
      </div>
    </div>
  )
}
