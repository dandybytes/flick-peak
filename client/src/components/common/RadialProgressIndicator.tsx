import React, {FC} from 'react'

import './RadialProgressIndicator.scss'

type RPIProps = {
  percentage: number
  radius: number
  strokeWidth: number
  backgroundColor: string
  textColor: string
  strokeColor: string
  trackColor?: string
  fontSize?: number
}

const RadialProgressIndicator: FC<RPIProps> = ({
  percentage,
  radius,
  backgroundColor,
  textColor,
  strokeWidth,
  strokeColor,
  trackColor = 'rgba(0, 0, 0, 0.1)',
  fontSize
}) => {
  const internalRadius = radius - strokeWidth / 3
  const circumference = Math.floor(2 * Math.PI * internalRadius)

  return (
    <div className='progress-indicator' style={{height: 2 * radius, width: 2 * radius}}>
      <div className='progress-indicator-background' style={{backgroundColor}} />

      <svg height={2 * radius} width={2 * radius}>
        <circle
          className='progress-indicator-track'
          stroke={trackColor}
          fill='transparent'
          strokeWidth={strokeWidth}
          cy={radius}
          cx={radius}
          r={internalRadius}
          // breaks the circle stroke into dashes and gaps
          strokeDasharray={`${circumference} ${circumference}`}
          strokeLinecap='round'
        />
        <circle
          className='progress-indicator-line'
          stroke={strokeColor}
          fill='transparent'
          strokeWidth={strokeWidth}
          cy={radius}
          cx={radius}
          r={internalRadius}
          strokeDasharray={`${circumference} ${circumference}`}
          // shifts the stroke dashes by certain amount
          strokeDashoffset={Math.floor(circumference * (1 - percentage))}
          strokeLinecap='round'
        />
      </svg>

      <p
        className={'progress-indicator-text'}
        style={{fontSize: fontSize ? fontSize : 0.65 * radius, color: textColor}}
      >
        <span>
          {Math.round(percentage * 100)}
          <sup>%</sup>
        </span>
      </p>
    </div>
  )
}

export default RadialProgressIndicator
