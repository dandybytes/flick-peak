import {CategorySelector} from './movieTypes'

export const getCategorySelector = (category: string): CategorySelector => {
  if (category === 'popular') return 'popular'
  if (category === 'top-rated') return 'top'
  return 'current'
}
