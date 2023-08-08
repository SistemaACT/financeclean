import React from 'react'
import Banking from './AreasComponents/Banking'
import Sales from './AreasComponents/Sales'
import Settings from './AreasComponents/Settings'
import Taxes from './AreasComponents/Taxes'

export default function Area({area, setArea}:{area?:string, setArea:(e:undefined|string)=>void}) {
  return (
    <>
    {area === undefined && <></>}
    {area !== undefined && <div className='font-bold p-2 text-2xl flex items-center'><button className='text-lg m-2 bg-red-500 hover:bg-red-700 rounded p-2 text-white' onClick={()=>setArea(undefined)}>X</button> {area} commands</div>}
    {area === "Banking" && <Banking></Banking>}
    {area === "Business" && <Sales></Sales>}
    {area === "Settings" && <Settings/>}
    </>

  )
}
