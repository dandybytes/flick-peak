import React, {FC} from 'react'

import './RadialProgressIndicator.scss'

type RPIProps = {
  percentage: number
  radius: number
  strokeWidth: number
  strokeColor: string
  trackColor?: string
  fontSize?: number
}

const RadialProgressIndicator: FC<RPIProps> = ({
  percentage,
  radius,
  strokeWidth,
  strokeColor,
  trackColor = 'rgba(0, 0, 0, 0.1)',
  fontSize
}) => {
  const internalRadius = radius - strokeWidth / 3
  const circumference = 2 * Math.PI * internalRadius

  return (
    <div className='progress-indicator' style={{height: 2 * radius, width: 2 * radius}}>
      <div className={'progress-indicator-background'} />

      <svg height={2 * radius} width={2 * radius}>
        <circle
          className='progress-indicator-track'
          // transition from light blue (rgb(157, 213, 244)) to purple (rgb(112, 92, 168))
          // stroke={`rgb(${Math.floor((157 - 112) * percentageLeft + 112)},${Math.floor(
          //     (213 - 92) * percentageLeft + 92
          // )},${Math.floor((224 - 168) * percentageLeft + 168)})`}
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
          strokeDashoffset={circumference * (1 - percentage)}
          strokeLinecap='round'
        />
      </svg>

      <p
        className={'progress-indicator-text'}
        style={{fontSize: fontSize ? fontSize : 0.65 * radius}}
      >
        <span>
          {percentage * 100}
          <sup>%</sup>
        </span>
      </p>
    </div>
  )
}

export default RadialProgressIndicator
