import { RED_FAINT } from '../../utils/constants'

export default function TextError({ message }) {
  if (!message) return null
  return (
    <div
      style={{
        backgroundColor: RED_FAINT,
        borderRadius: 10,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <p>{message}</p>
    </div>
  )
}
