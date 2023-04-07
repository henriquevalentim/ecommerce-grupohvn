import { Carousel as Slider } from 'react-responsive-carousel'
import { ContainerImage } from './styles'
import { useEffect, useState } from 'react'
import api from '../../utils/api'

export default function Carousel() {
  const [carousel, setCarousel] = useState()

  useEffect(() => {
    const getCarrousel = async () => {
      const response = await api.get(`/setting/SETTING_CAROUSEL_01`)
      setCarousel(response.data.metadatas)
    }

    getCarrousel()
  }, [])
  if (!carousel) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <Slider showThumbs={false}>
        {carousel.map((item) => (
          <ContainerImage>
            <img src={item.key} alt={item.value} />
            <p className='legend'>{item.value}</p>
          </ContainerImage>
        ))}
      </Slider>
    </div>
  )
}
