import React, {FC, MutableRefObject, useCallback, useState, useRef, useEffect} from 'react'

import './SearchBar.scss'

import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon'

type SearchBarProps = {
  query: string
  setQuery: (query: string) => void
  debounceDuration?: number
}

const SearchBar: FC<SearchBarProps> = ({query, setQuery, debounceDuration = 200}) => {
  const timeoutRef: MutableRefObject<ReturnType<typeof setTimeout> | null> = useRef(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const [inputValue, setInputValue] = useState(query)

  const updateQuery = useCallback(() => {
    const trimmedValue = inputValue.trim()
    // update query only if different from the trimmed value typed in the input field
    if (trimmedValue !== query) setQuery(trimmedValue)
    // if only spaces entered in input field, clear the input
    if (trimmedValue?.length === 0) setInputValue('')
  }, [inputValue, query, setQuery])

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>): void =>
    setInputValue(event.target.value)

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    updateQuery()
  }

  // focus on the search bar when the component renders for the first time
  useEffect(() => {
    if (searchInputRef?.current != null) searchInputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (timeoutRef.current != null) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => updateQuery(), debounceDuration)

    return () => {
      if (timeoutRef.current != null) clearTimeout(timeoutRef.current)
    }
  }, [debounceDuration, updateQuery])

  return (
    <form className='searchbar-form' onSubmit={handleSubmit}>
      <label className='searchbar-label'>
        <input
          type='search'
          className='searchbar-input'
          placeholder='movie title...'
          value={inputValue}
          onChange={handleSearchInput}
          ref={searchInputRef}
        />
        <MagnifyingGlassIcon />
      </label>
    </form>
  )
}

export default SearchBar
