import ReactInputMask from 'react-input-mask'
import { TextField } from '@mui/material'

export default function InputMask({
  mask = '99999-999',
  label,
  placeholder,
  setValue,
  value = '',
  type = 'text',
  style,
  onFocus = null
}) {
  return (
    <ReactInputMask
      mask={mask}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      onFocus={onFocus}
    >
      {(inputProps) => (
        <TextField
          type={type}
          label={label}
          placeholder={placeholder}
          style={style}
          variant='outlined'
          fullWidth
          required
        />
      )}
    </ReactInputMask>
  )
}
