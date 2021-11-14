import {FunctionComponent, ReactNode} from 'react'
import {createPortal} from 'react-dom'

import './Modal.scss'

type ModalProps = {
  children: ReactNode
  hideModal: () => void
  showCross?: boolean
  message?: string
  status?: 'regular' | 'alert' | 'warning'
}

const portalContainerID = 'modal'

const Modal: FunctionComponent<ModalProps> = ({
  children,
  hideModal,
  showCross = false,
  message,
  status
}) => {
  const portalContainer = document.getElementById(portalContainerID)

  if (portalContainer == null) {
    console.error(
      `The modal could not be rendered, because the HTML element with ID ${portalContainerID}, which is supposed to serve as anchor for the modal portal, could not be found.`
    )
    return null
  }

  return createPortal(
    <div className={`modal-backdrop ${status ? status : ''}`}>
      <div className='modal-content'>
        <span
          className='modal-close'
          style={{display: showCross ? 'block' : 'none'}}
          onClick={hideModal}
        >
          &times;
        </span>

        {message && <h2 className='modal-title'>{message}</h2>}

        {children}
      </div>
    </div>,
    portalContainer
  )
}

export default Modal
