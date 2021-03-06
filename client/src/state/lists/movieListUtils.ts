import {CategorySelector} from './movieListTypes'

export const getCategorySelector = (category: string): CategorySelector => {
  if (category === 'popular') return 'popular'
  if (category === 'top') return 'top'
  return 'current'
}
