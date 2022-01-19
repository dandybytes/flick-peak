import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {debounce} from 'debounce'

import {userReducer} from './user/userReducer'
import {movieListReducer} from './lists/movieListReducer'
import {movieDetailReducer} from './details/movieDetailReducer'
import {favoriteReducer} from './favorites/favoriteReducer'
import {notificationReducer} from './notifications/notificationReducer'
import {movieRecommendationReducer} from './recommendations/recommendationReducer'
import {UserData} from '.'

const rootReducer = combineReducers({
  user: userReducer,
  lists: movieListReducer,
  movies: movieDetailReducer,
  recommendations: movieRecommendationReducer,
  favorites: favoriteReducer,
  notifications: notificationReducer
})

const localStorageKey = '_flick_pick'
const debounceDuration = 1000

const saveToLocalStorage = (state: RootState) => {
  try {
    if (state.user.data != null) {
      localStorage.setItem(localStorageKey, JSON.stringify(state.user.data))
    } else {
      localStorage.removeItem(localStorageKey)
    }
  } catch (error) {
    console.error('saving to local storage failed: ', error)
  }
}

const loadFromLocalStorage = () => {
  try {
    const storedState = localStorage.getItem(localStorageKey)
    if (storedState == null) return undefined
    return JSON.parse(storedState)
  } catch (error) {
    console.error('failed to retrieve state from local storage: ', error)
    return undefined
  }
}

/**
 * TODO: Local storage state cache should be used only for long-term properties
 * Frequently changing data (e.g. movies currently in theaters) should be retrieved anew...
 * ...from the API rather than cached or be cached for only a reasonably short time (e.g. 24 hours)
 */
const initialState = {
  user: {
    data: loadFromLocalStorage() as UserData
  }
}

export const store = createStore(
  rootReducer,
  // @ts-ignore
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)

// save the state to local storage and debounce the saving process for better performance
store.subscribe(debounce(() => saveToLocalStorage(store.getState()), debounceDuration))

export type RootState = ReturnType<typeof store.getState>
