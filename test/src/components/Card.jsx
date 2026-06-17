import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function card({image}) {

  return (
    <div className='w-25 h-45 bg-[#020234] border-2 border-[#0000ff2e] rounded-2xl overflow-hidden cursor-pointer'>
        <img src={image} className='h-full object-cover'/>
    </div>
  )
}
