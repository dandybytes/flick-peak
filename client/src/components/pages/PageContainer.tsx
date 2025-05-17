import {forwardRef, ReactNode} from 'react'
import {motion} from 'framer-motion'

import './PageContainer.scss'

import {pageContainerVariants} from '../../motion'

type PCProps = {
  children: ReactNode
  classNames?: string
  backgroundImage?: string
}

const PageContainer = forwardRef<HTMLDivElement, PCProps>(
  ({children, classNames, backgroundImage}, ref) => {
    return (
      <motion.div
        ref={ref}
        className={`page ${classNames ? classNames : ''}`}
        variants={pageContainerVariants}
        initial='before'
        animate='ready'
        exit='after'
        style={
          backgroundImage
            ? {
                backgroundImage: `radial-gradient(rgba(10, 15, 25, 0.2), rgba(10, 15, 25, 0.9)), url(${backgroundImage})`
              }
            : {}
        }
      >
        {children}
      </motion.div>
    )
  }
)

export default PageContainer
