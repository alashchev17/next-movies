type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6
  text: string
  color?: string
  className?: string
}

export const Heading = ({ level, text, color = 'text-black', className }: HeadingProps) => {
  switch (level) {
    case 1:
      return <h1 className={`text-xl md:text-3xl font-bold ${color} ${className ? className : ''}`}>{text}</h1>
    case 2:
      return <h2 className={`text-xl font-bold ${color} ${className ? className : ''}`}>{text}</h2>
    case 3:
      return <h3 className={`text-lg font-bold ${color} ${className ? className : ''}`}>{text}</h3>
    case 4:
      return <h4 className={`text-base font-bold ${color} ${className ? className : ''}`}>{text}</h4>
    case 5:
      return <h5 className={`text-base font-bold ${color} ${className ? className : ''}`}>{text}</h5>
    case 6:
      return <h6 className={`text-sm font-bold ${color} ${className ? className : ''}`}>{text}</h6>
    default:
      return <h1 className={className ? className : ''}>{text}</h1>
  }
}
