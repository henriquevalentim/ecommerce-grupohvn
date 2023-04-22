import { TextField } from '@mui/material'

export default function InputText({
  label,
  placeholder,
  setValue,
  value = '',
  type = 'text',
  style,
  onFocus = null
}) {
  return (
    <TextField
      type={type}
      label={label}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      style={style}
      variant='outlined'
      onFocus={onFocus}
      fullWidth
      required
    />
  )
}
