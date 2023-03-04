import { BLUE } from '../../utils/constants'
import Logo from '../../components/Logo'

export default function Header() {
  return (
    <div style={{ height: 80, backgroundColor: BLUE, display: 'flex' }}>
      <div style={{ marginLeft: 10 }}>
        <Logo />
      </div>
    </div>
  )
}
