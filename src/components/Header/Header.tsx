import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@/components/Logo'

export const Header = () => {
  return (
    <header className="flex px-4 py-4 md:py-6 border-b">
      <Link href="/" className="flex items-center gap-3 md:gap-4">
        <Logo width={35} height={35} />
        <span className="mt-1 font-bold text-sm md:text-xl">IMDB Top Rated</span>
      </Link>
    </header>
  )
}
