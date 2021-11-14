import {FC} from 'react'

import './RadialProgressIndicator.scss'

type RPIProps = {
  percentage: number
  radius: number
  strokeWidth: number
  textColor?: string
  strokeColor?: string
  backgroundColor?: string
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
  trackColor,
  fontSize
}) => {
  const internalRadius = radius - strokeWidth / 3
  const circumference = Math.floor(2 * Math.PI * internalRadius)

  return (
    <div className='progress-indicator' style={{height: 2 * radius, width: 2 * radius}}>
      <div
        className='progress-indicator-background'
        style={backgroundColor ? {backgroundColor} : {}}
      />

      <svg height={2 * radius} width={2 * radius}>
        <circle
          className='progress-indicator-track'
          fill='transparent'
          strokeWidth={strokeWidth}
          cy={radius}
          cx={radius}
          r={internalRadius}
          // breaks the circle stroke into dashes and gaps
          strokeDasharray={`${circumference} ${circumference}`}
          strokeLinecap='round'
          style={trackColor ? {stroke: trackColor} : {}}
        />
        <circle
          className='progress-indicator-line'
          fill='transparent'
          strokeWidth={strokeWidth}
          cy={radius}
          cx={radius}
          r={internalRadius}
          strokeDasharray={`${circumference} ${circumference}`}
          // shifts the stroke dashes by certain amount
          strokeDashoffset={Math.floor(circumference * (1 - percentage))}
          strokeLinecap='round'
          style={strokeColor ? {stroke: strokeColor} : {}}
        />
      </svg>

      <p
        className={'progress-indicator-text'}
        style={{
          fontSize: fontSize ? fontSize : 0.65 * radius,
          color: textColor ? textColor : undefined
        }}
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
