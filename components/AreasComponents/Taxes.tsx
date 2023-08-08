import React from 'react'
import {MdPointOfSale} from "react-icons/md"
import {GiReceiveMoney, GiCash} from "react-icons/gi"
import Option from '../Option'

export default function Taxes() {
    const [money, setMoney] = React.useState<number>(0)

  return (
    <form className='p-2'>
        <input className='border rounded w-full p-2' placeholder='Amount paid' type="number" onChange={(e)=>{setMoney(Number(e.target.value))}}></input>
        <button type='submit' className='p-2 bg-green-500 text-white text-2xl rounded w-full '>Run</button>
    </form>
  )
}

