import { useEffect } from 'react'
import { Typografy } from './styles'

export default function Text({ children, size = 20, center = false, color }) {
  useEffect(() => {
    console.log(color)
  }, [])

  return (
    <div>
      <Typografy size={size} center={center} color={color}>
        {children}
      </Typografy>
    </div>
  )
}
