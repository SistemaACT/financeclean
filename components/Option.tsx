import React, { ReactNode } from 'react'

export default function Option({label, Icon, Area, onClick}:{label:string, Icon:ReactNode, Area:string, onClick:(e:string)=>void}) {
  return (

        <div className='border rounded flex w-full p-2 items-center space-x-2 text-2xl justify-center hover:bg-gray-200' onClick={()=>onClick(Area)}>
            <div className='text-blue-700'>{Icon}</div> <p>{label}</p>
        </div>

  )
}
