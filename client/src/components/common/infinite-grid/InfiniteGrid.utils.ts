export const getNumberItemsPerRow = (rowWidth: number, itemWidth: number) =>
  Math.max(Math.floor(rowWidth / itemWidth), 1)

export const getNumberRows = (
  rowWidth: number,
  itemWidth: number,
  numItems: number,
  moreItemsAvailable: boolean
) => {
  const numItemsPerRow = getNumberItemsPerRow(rowWidth, itemWidth)
  return Math.ceil(numItems / numItemsPerRow) + (moreItemsAvailable ? 1 : 0)
}

export const getIndexesItemsInCurrentRow = (
  rowIndex: number,
  numItemsPerRow: number,
  totalNumItems: number
): number[] => {
  const startIndex = rowIndex * numItemsPerRow

  return Array.from(
    {length: Math.min(startIndex + numItemsPerRow, totalNumItems) - startIndex},
    (_, i) => i + startIndex
  )
}
