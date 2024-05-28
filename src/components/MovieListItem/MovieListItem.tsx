'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import styles from './MovieListItem.module.css'

import { Movie } from '@/types'

import { Heading } from '@/components/Heading'
import { Button } from '@/components/Button'

import errorPlaceholderSrc from './placeholder.png'
import { useRouter } from 'next/navigation'

interface MovieListItemProps {
  movie: Movie
}

// const initialDimensions = {
//   width: 186,
//   height: 280,
// }

export const MovieListItem = ({ movie }: MovieListItemProps) => {
  const router = useRouter()

  const [isHovering, setIsHovering] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSeen, setIsSeen] = useState<boolean>(
    typeof window !== 'undefined' && !!window.localStorage.getItem(`movie-${decodeURIComponent(movie.name)}-seen`)
  )
  const [isFavourite, setIsFavourite] = useState<boolean>(
    typeof window !== 'undefined' && !!window.localStorage.getItem(`movie-${decodeURIComponent(movie.name)}-favourite`)
  )
  // const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>(initialDimensions)

  useEffect(() => {
    if (isSeen) {
      window.localStorage.setItem(`movie-${decodeURIComponent(movie.name)}-seen`, 'true')
    } else {
      window.localStorage.removeItem(`movie-${decodeURIComponent(movie.name)}-seen`)
    }
  }, [isSeen, movie.name])

  useEffect(() => {
    if (isFavourite) {
      window.localStorage.setItem(`movie-${decodeURIComponent(movie.name)}-favourite`, 'true')
    } else {
      window.localStorage.removeItem(`movie-${decodeURIComponent(movie.name)}-favourite`)
    }
  }, [isFavourite, movie.name])

  // this check is important for us because every 'use client' component firstly tries to be rendered on server side
  // if it's not dynamically imported in parent component like 'const DynamicMovieListItem = dynamic(() => import('@/components/MovieListItem'), { ssr: false })'

  // useEffect(() => {
  //   const handleWindowResize = () => {
  //     if (window.innerWidth >= 768) {
  //       setImageDimensions({ width: 280, height: 410 })
  //     } else if (window.innerWidth >= 1024) {
  //       setImageDimensions({ width: 560, height: 840 })
  //     } else if (window.innerWidth < 768) {
  //       setImageDimensions(initialDimensions)
  //     }
  //   }

  //   handleWindowResize()

  //   window.addEventListener('resize', handleWindowResize)
  //   return () => {
  //     window.removeEventListener('resize', handleWindowResize)
  //   }
  // }, [])

  // used to create an error handler, because origin of Aladdin movie was responding with 404

  return (
    <div className="relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className={`${styles.movieContext} ${isHovering && styles.movieContextActive}`}>
        <Heading level={6} text={movie.name} color={'text-zinc-50'} />
        <div className="flex flex-col gap-1">
          <p className="text-sm text-zinc-200">
            Released: <span className="font-bold">{movie.year}</span>
          </p>
          <p className="text-sm text-zinc-200">
            Rating: <span className="font-bold">{movie.rating.toFixed(1)}</span>
          </p>
        </div>
        <div className="flex gap-4 mt-3">
          <Button variant="favourite" onClick={() => setIsFavourite((prev) => !prev)} isActive={isFavourite} />
          <Button variant="seen" onClick={() => setIsSeen((prev) => !prev)} isActive={isSeen} />
        </div>
        <Button variant="primary" text="Details" onClick={() => router.push(`/movie/${movie.name}`)} />
      </div>
      <Image
        src={!isError ? movie.image_url : errorPlaceholderSrc}
        alt={movie.name}
        width={186}
        height={280}
        className={`w-full h-auto md:w-[186px] object-cover`}
        onError={() => setIsError(true)}
      />
    </div>
  )
}
