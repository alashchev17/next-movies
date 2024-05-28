'use client'

import styles from './Button.module.css'

import { FavouriteIcon } from '@/components/Icons/FavouriteIcon'
import { SeenIcon } from '@/components/Icons/SeenIcon'

interface ButtonProps {
  variant: 'favourite' | 'seen' | 'primary'
  text?: string
  isActive?: boolean
  className?: string
  onClick: () => void
}

export const Button = ({ text, variant, isActive = false, onClick, className = '' }: ButtonProps) => {
  switch (variant) {
    case 'favourite':
      return (
        <button className={`${className} ${styles.stateButton} ${isActive ? styles.stateButtonActive : ''}`} onClick={onClick}>
          <FavouriteIcon fill={`${isActive ? 'rgb(39 39 42)' : '#ffffff'}`} width={16} height={16} />
        </button>
      )
    case 'seen':
      return (
        <button className={`${className} ${styles.stateButton} ${isActive ? styles.stateButtonActive : ''}`} onClick={onClick}>
          <SeenIcon fill={`${isActive ? 'rgb(39 39 42)' : '#ffffff'}`} width={16} height={16} />
        </button>
      )
    case 'primary':
      return (
        <button className={`${className} ${styles.primary}`} onClick={onClick}>
          {text ? text : null}
        </button>
      )
    default:
      return null
  }
}
