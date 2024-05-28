import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { Heading } from '@/components/Heading'

import { getMovieByName } from '@/lib/utils/getMovieByName'
import { Button } from '@/components/Button'

type MoviePageProps = {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: MoviePageProps): Metadata {
  return {
    title: params.slug,
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const movie = await getMovieByName(decodeURIComponent(params.slug))
  return (
    <>
      {movie && (
        <div className="bg-zinc-100 text-zinc-400 min-h-screen flex flex-col items-center px-5 py-6">
          <div className="w-full bg-zinc-800 rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <Image
                src={movie.image_url}
                alt={movie.name}
                className="w-full md:w-[calc(50%-1.5rem)] h-auto mb-4 rounded"
                width={180}
                height={300}
              />
              <div>
                <Heading level={1} text={movie.name} className="text-3xl font-bold mb-2" color={'text-zinc-100'} />
                <p className="text-xl mb-2">
                  <strong>Released on:</strong> {movie.year}
                </p>
                <p className="text-xl mb-2">
                  <strong>Movie rating:</strong> {movie.rating.toFixed(1)}
                </p>
                <p className="text-xl mb-2">
                  <strong>Genres:</strong> {movie.genre.map((item) => item).join(', ')}
                </p>
              </div>
            </div>
            <p className="text-lg mb-4">
              <strong>Short description:</strong> {movie.desc}
            </p>
            <p className="mb-2">
              <strong>Director:</strong> {movie.directors.map((director) => director).join(', ')}
            </p>
            <p className="mb-4">
              <strong>Actors:</strong> {movie.actors.map((actor) => actor).join(', ')}
            </p>
            <Link
              className="inline-block mt-2 text-zinc-200 bg-zinc-800 rounded-md px-6 py-3 transition-colors border-solid border-zinc-200 border-[1px] hover:bg-zinc-200 hover:border-zinc-800 hover:text-zinc-800"
              href="/"
            >
              Go Back
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
