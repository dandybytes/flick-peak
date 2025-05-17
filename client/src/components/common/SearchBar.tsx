import {FC, FormEvent, MutableRefObject, useState, useRef, useEffect} from 'react'

import {FaSearch} from 'react-icons/fa'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

import './SearchBar.scss'

type SearchBarProps = {
  query: string | null
  setQuery: (query: string) => void
  debounceDuration?: number
  autoFocus?: boolean
  placeholder: string
}

const SearchBar: FC<SearchBarProps> = ({
  query,
  setQuery,
  debounceDuration = 300,
  autoFocus = false,
  placeholder
}) => {
  const timeoutRef: MutableRefObject<ReturnType<typeof setTimeout> | null> = useRef(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const [inputValue, setInputValue] = useState(query)

  const updateQuery = () => {
    if (inputValue == null) return
    const trimmedValue = inputValue.trim()
    // update query only if different from the trimmed value typed in the input field
    if (trimmedValue !== query) setQuery(trimmedValue)
    // if only spaces entered in input field, clear the input
    if (trimmedValue?.length === 0 && inputValue !== trimmedValue) setInputValue('')
  }

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()
    updateQuery()
  }

  /**
   * when search input focused update the query value from null to empty string, thereby...
   * ...switching from category route to search route
   */
  const handleInputFocus = () => {
    if (inputValue == null) setInputValue('')
  }

  /**
   * when the user leaves the search bar and there is no query value entered...
   * ... set the query value to null in order to deactivate search and allow movie category display
   */
  const handleInputBlur = () => {
    if (!inputValue?.length) setInputValue(null)
  }

  // focus on the search bar when the component renders for the first time
  useEffect(() => {
    if (autoFocus && searchInputRef?.current != null) searchInputRef.current?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // if the query has been cancelled, clear the search input value
  useEffect(() => {
    if (query == null && inputValue !== query) setInputValue(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

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

  const isActive = inputValue != null

  return (
    <form className='searchbar-form' onSubmit={handleSubmit}>
      <label className='searchbar-label'>
        <input
          type='search'
          className={'searchbar-input' + (isActive ? ' active' : '')}
          placeholder={placeholder}
          value={inputValue ?? ''}
          onChange={event => setInputValue(event.target.value)}
          ref={searchInputRef}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />

        {isActive ? (
          <FaSearch />
        ) : (
          <Tooltip trigger={['hover', 'focus']} overlay={<p>Find movies</p>} placement='bottom'>
            <FaSearch />
          </Tooltip>
        )}
      </label>
    </form>
  )
}

export default SearchBar
