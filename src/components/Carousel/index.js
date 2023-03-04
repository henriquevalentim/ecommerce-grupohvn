import { Carousel as Slider } from 'react-responsive-carousel'
import { ContainerImage } from './styles'

export default function Carousel() {
  return (
    <div style={{ paddingTop: 10 }}>
      <Slider showThumbs={false}>
        <ContainerImage>
          <img src='https://via.placeholder.com/600x200' alt='Carousel' />
          <p className='legend'>Legend 1</p>
        </ContainerImage>
        <ContainerImage>
          <img src='https://via.placeholder.com/600x200' alt='Carousel' />
          <p className='legend'>Legend 1</p>
        </ContainerImage>
        <ContainerImage>
          <img src='https://via.placeholder.com/600x200' alt='Carousel' />
          <p className='legend'>Legend 1</p>
        </ContainerImage>
      </Slider>
    </div>
  )
}
