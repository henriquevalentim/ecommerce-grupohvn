import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'

export default function InputDate({ label, setValue, value, style }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        style={style}
        className='fullwidth'
        label={label}
        value={value}
        format='dd/MM/yyyy'
        onChange={(e) => setValue(e)}
      />
    </LocalizationProvider>
  )
}
