import {CSSProperties, FC, useRef} from 'react'

import {FixedSizeList} from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'

import './InfiniteGrid.scss'

import {
  getNumberItemsPerRow,
  getNumberRows,
  getIndexesItemsInCurrentRow
} from './InfiniteGrid.utils'

type InfiniteGridProps<I> = {
  itemList: I[]
  itemHeight: number
  itemWidth: number
  itemRenderer: (item: I) => JSX.Element
  moreItemsAvailable: boolean
  isFetching: boolean
  fetchItems: () => void
}

const InfiniteGrid: FC<InfiniteGridProps<any>> = ({
  itemList,
  itemHeight,
  itemWidth,
  itemRenderer,
  moreItemsAvailable,
  isFetching,
  fetchItems
}) => {
  const infiniteLoaderRef = useRef(null)

  /**
   * TODO: compute width & height based on parent element sizes instead of window sizes
   */
  const listContainerWidth = window.innerWidth
  const listContainerHeight = window.innerHeight
  const rowCount = getNumberRows(listContainerWidth, itemWidth, itemList.length, moreItemsAvailable)

  const loadMoreItems = () => {
    if (!isFetching) fetchItems()
  }

  const renderInfiniteGridRow = ({index, style}: {index: number; style: CSSProperties}) => {
    const numItemsPerRow = getNumberItemsPerRow(listContainerWidth, itemWidth)
    const itemIndexesCurrentRow = getIndexesItemsInCurrentRow(
      index,
      numItemsPerRow,
      itemList.length
    )
    const itemsCurrentRow = itemIndexesCurrentRow.map(itemIndex => itemList[itemIndex])

    return (
      <div className='list-row' style={style}>
        {itemsCurrentRow.map(itemRenderer)}
      </div>
    )
  }

  return (
    <InfiniteLoader
      ref={infiniteLoaderRef}
      itemCount={rowCount}
      isItemLoaded={index => {
        const numItemsPerRow = getNumberItemsPerRow(listContainerWidth, itemWidth)
        const allItemsLoaded =
          getIndexesItemsInCurrentRow(index, numItemsPerRow, itemList.length).length > 0

        return !moreItemsAvailable || allItemsLoaded
      }}
      loadMoreItems={loadMoreItems}
    >
      {({onItemsRendered, ref}) => (
        <FixedSizeList
          className='infinite-list'
          ref={ref}
          height={listContainerHeight}
          width={listContainerWidth}
          itemCount={rowCount}
          itemSize={itemHeight}
          onItemsRendered={onItemsRendered}
        >
          {renderInfiniteGridRow}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  )
}

export default InfiniteGrid
