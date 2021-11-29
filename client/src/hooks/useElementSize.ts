import {MutableRefObject, useCallback, useEffect, useState, useRef} from 'react'

type ElementSize = {
  height: number
  width: number
}

const initialSize: ElementSize = {
  height: 0,
  width: 0
}

/**
 * React hook that retrieves the size parameters of an HTML element whose ref is provided
 * @param elementRef A React ref to the element whose size parameters must be retrieved
 * @param debounceDuration The number of milliseconds by which size value adjustments must be debounced
 * @returns A DOMRect object containing width and height among other properties
 */
export const useElementSize = <T extends HTMLElement>(
  elementRef: MutableRefObject<T | null>,
  debounceDuration = 200
): ElementSize => {
  const isFirstTimeRef = useRef(true)
  const timeoutRef: MutableRefObject<ReturnType<typeof setTimeout> | null> = useRef(null)

  const [elementSize, setElementSize] = useState<ElementSize>(initialSize)

  const updateElementSize = useCallback(
    (newSize: DOMRect | undefined) => {
      const newHeight = Math.round(newSize?.height ?? 0)
      const newWidth = Math.round(newSize?.width ?? 0)

      // prevent update if new size is invalid or if same as previous
      if (newSize == null || (newHeight === elementSize.height && newWidth === elementSize.width))
        return

      // use a ref to keep track if getting values for first time, and, if so, avoid debounce
      if (isFirstTimeRef.current) {
        setElementSize({height: newHeight, width: newWidth})
        isFirstTimeRef.current = false
        return
      }

      if (!debounceDuration) return setElementSize({height: newHeight, width: newWidth})

      if (timeoutRef.current != null) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(
        () => setElementSize({height: newHeight, width: newWidth}),
        debounceDuration
      )
    },
    [debounceDuration, elementSize.height, elementSize.width, isFirstTimeRef]
  )

  // memoize observer using React ref
  const observerRef = useRef(
    new ResizeObserver(entries => {
      // watch only the first element (entries[0]), as only one will be provided
      updateElementSize(entries[0]?.contentRect)
    })
  )

  // subscribe to resize observer
  useEffect(() => {
    const element = elementRef.current
    const observer = observerRef.current
    if (element && observer) observer.observe(element)

    return () => {
      if (element && observer) observer.unobserve(element)
    }
  }, [elementRef, observerRef])

  // lisent to window resize events and trigger size data update (after debounce duration)
  // useEffect(() => {
  //   const element = elementRef.current

  //   window.addEventListener('resize', () => {
  //     updateElementSize(element?.getBoundingClientRect())
  //   })

  //   return () =>
  //     window.removeEventListener('resize', () =>
  //       updateElementSize(element?.getBoundingClientRect())
  //     )
  // }, [debounceDuration, elementRef, updateElementSize])

  return elementSize
}
