import { Typography } from '@mui/material'
import { useState } from 'react'
import ReactStarRating from 'react-star-ratings'

export default function StarRating() {
  const [rating, setRating] = useState(0)
  return (
    <div style={{ display: 'flex' }}>
      <ReactStarRating
        rating={rating}
        starRatedColor='#1976D2'
        starDimension='20px'
        starSpacing='3px'
        changeRating={(newRating) => {
          setRating(newRating)
        }}
      />
      <Typography> {rating}</Typography>
    </div>
  )
}
