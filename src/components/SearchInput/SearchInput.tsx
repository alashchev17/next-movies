'use client'

import styles from './SearchInput.module.css'

interface SearchInputProps {
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput = ({ type, placeholder, value, onChange }: SearchInputProps) => {
  return <input className={styles.searchInput} type={type} placeholder={placeholder} value={value} onChange={onChange} />
}
