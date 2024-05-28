import Image from 'next/image'
import logoSrc from './logo.svg'

interface LogoProps {
  width?: number
  height?: number
}

export const Logo = ({ width = 50, height = 50 }: LogoProps) => {
  return <Image src={logoSrc} alt="logo" width={width} height={height} />
}
