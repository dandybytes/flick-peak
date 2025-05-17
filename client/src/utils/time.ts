const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const getFullYear = (dateObject: Date): string => {
  return dateObject.getFullYear().toString()
}

export const getMonthName = (dateObject: Date, length?: 'short' | 'full'): string => {
  const monthNumber = dateObject.getMonth()
  const monthName = monthNames[monthNumber]
  if (length === 'short') return monthName.slice(0, 3)
  return monthName
}
