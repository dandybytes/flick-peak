import {forwardRef, ReactNode} from 'react'
import {motion} from 'framer-motion'

import './PageContainer.scss'

import {pageContainerVariants} from '../../motion'

type PCProps = {
  children: ReactNode
  classNames?: string
}

const PageContainer = forwardRef<HTMLDivElement, PCProps>(({children, classNames}, ref) => {
  return (
    <motion.div
      ref={ref}
      className={`page ${classNames ? classNames : ''}`}
      variants={pageContainerVariants}
      initial='before'
      animate='ready'
      exit='after'
    >
      {children}
    </motion.div>
  )
})

export default PageContainer
