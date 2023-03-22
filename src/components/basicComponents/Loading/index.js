import React from 'react'

import ReactLoading from 'react-loading'
import { BLUE } from '../../../utils/constants'

export default function Loading({ loading }) {
  return (
    <>
      {loading && (
        <ReactLoading
          type={'spinningBubbles'}
          color={BLUE}
          height={50}
          width={50}
          className='centerLoading'
        />
      )}
    </>
  )
}
