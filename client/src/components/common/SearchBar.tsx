import React, {FC, MutableRefObject, useState, useRef, useEffect} from 'react'

import './SearchBar.scss'

import MagnifyingGlassIcon from '../icons/MagnifyingGlassIcon'

type SearchBarProps = {
  query: string
  setQuery: (query: string) => void
  autoFocus?: boolean
  debounceDuration?: number
}

const SearchBar: FC<SearchBarProps> = ({
  query,
  setQuery,
  autoFocus = false,
  debounceDuration = 300
}) => {
  const timeoutRef: MutableRefObject<ReturnType<typeof setTimeout> | null> = useRef(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const [inputValue, setInputValue] = useState(query)

  const updateQuery = () => {
    const trimmedValue = inputValue.trim()
    // update query only if different from the trimmed value typed in the input field
    if (trimmedValue !== query) setQuery(trimmedValue)
    // if only spaces entered in input field, clear the input
    if (trimmedValue?.length === 0) setInputValue('')
  }

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    updateQuery()
  }

  // if the query has been cancelled, clear the search input value
  useEffect(() => {
    if (query === '' && inputValue !== query) setInputValue('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  // focus on the search bar when the component renders for the first time
  useEffect(() => {
    if (autoFocus && searchInputRef?.current != null) searchInputRef.current?.focus()
  }, [autoFocus])

  // update query based on input value changes only after debounce interval
  useEffect(() => {
    if (timeoutRef.current != null) clearTimeout(timeoutRef.current)
    if (inputValue !== query) {
      timeoutRef.current = setTimeout(() => {
        updateQuery()
      }, debounceDuration)

      return () => {
        if (timeoutRef.current != null) clearTimeout(timeoutRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  return (
    <form className='searchbar-form' onSubmit={handleSubmit}>
      <label className='searchbar-label'>
        <input
          type='search'
          className='searchbar-input'
          placeholder='movie title...'
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
          ref={searchInputRef}
        />
        <MagnifyingGlassIcon />
      </label>
    </form>
  )
}

export default SearchBar
