import { Heading } from '@/components/Heading'
import { MovieList } from '@/components/MovieList'
import { getMovies } from '@/lib/utils/getMovies'

export default async function Home() {
  const movies = await getMovies()
  return (
    <main className="px-4 py-4">
      <section className="flex flex-col gap-3">
        <Heading level={1} text="IMDB Top 250 Movies" className="text-center" />
        <MovieList movies={movies} />
      </section>
    </main>
  )
}
