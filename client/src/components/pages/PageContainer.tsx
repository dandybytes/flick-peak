import {FunctionComponent, ReactNode} from 'react'
import {motion} from 'framer-motion'

import './PageContainer.scss'

import {pageContainerVariants} from '../../motion'

type PCProps = {
  children: ReactNode
  classNames?: string
}

const PageContainer: FunctionComponent<PCProps> = ({children, classNames}) => {
  return (
    <motion.div
      className={`page ${classNames ? classNames : ''}`}
      variants={pageContainerVariants}
      initial='before'
      animate='ready'
      exit='after'
    >
      {children}
    </motion.div>
  )
}

export default PageContainer
