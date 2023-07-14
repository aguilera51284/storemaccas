import { Splide, SplideSlide } from '@splidejs/react-splide'
import Image from 'next/image'

const Banner = ({ slides }) => {
  if (slides.length <= 0) {
    return (
      <div className="w-full text-center">
        <div className="container">
          <h3 className="video-banner-title h1">
            Lo sentimos no tenemos nada que mostrar
          </h3>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <Splide>
        {slides.map((slide) => (
          <SplideSlide
            key={slide.id}
            className="aspect-h-3 aspect-w-4 md:aspect-w-3 md:aspect-h-1"
          >
            <Image
              objectFit="cover"
              alt={slide.attributes.name}
              layout="fill"
              src={slide.attributes.cover.data.attributes.url}
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}

Banner.defaultProps = {
  slides: [],
}

export default Banner
