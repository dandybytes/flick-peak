/**
 * Formats a number or string with numerical separators
 * @param value number or string representation of number to be formatted
 * @param decimalSeparator string value of decimal separator
 * @param numericSeparator string character to use as numeric separator
 * @returns formatted string representation of provided value
 */
export const formattedNumber = (
  value: number | string,
  decimalSeparator = '.',
  numericSeparator = ','
) => {
  if (typeof value !== 'number' && typeof value !== 'string') {
    console.error(`value of invalid type (${typeof value}) provided to function formattedNumber`)
    return ''
  }

  let [whole, decimals] = String(value).split(decimalSeparator)
  const fragments = []
  while (whole.length >= 3) {
    fragments.unshift(whole.slice(whole.length - 3))
    whole = whole.slice(0, whole.length - 3)
  }
  if (whole.length > 0) fragments.unshift(whole)
  return fragments.join(numericSeparator) + (decimals ? decimalSeparator + decimals : '')
}

/**
 * Adds currency symbol in front of amount
 * @param value number or string-representation of number to be formatted
 */
export const formattedCurrency = (value: number | string, currencySign = '$') => {
  return currencySign + formattedNumber(value)
}
