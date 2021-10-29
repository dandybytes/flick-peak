import React, {FC} from 'react'

import './Button.scss'

type ButtonProps = {
  className?: string
  onClick?: () => void
  children: React.ReactNode
}

const Button: FC<ButtonProps> = ({className, onClick, children}: ButtonProps) => (
  <button className={`button ${className}`} onClick={onClick}>
    {children}
  </button>
)

export const OutlineButton: FC<ButtonProps> = ({className, onClick, children}: ButtonProps) => (
  <Button className={`button-outline ${className}`} onClick={onClick}>
    {children}
  </Button>
)

export default Button
