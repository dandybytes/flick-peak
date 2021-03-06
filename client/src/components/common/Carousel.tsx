import {FC} from 'react'

import SlickSlider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './Carousel.scss'

type CarouselProps = {
  children: JSX.Element[]
}

const Carousel: FC<CarouselProps> = ({children}) => {
  return (
    <SlickSlider
      autoplay={true}
      arrows={true}
      dots={true}
      draggable={true}
      infinite={true}
      pauseOnHover={true}
      speed={500}
      slidesToShow={children?.length >= 3 ? 3 : 1}
      slidesToScroll={1}
      swipeToSlide={true}
      accessibility={true}
    >
      {children}
    </SlickSlider>
  )
}

export default Carousel
