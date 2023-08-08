"use client"
import React from "react"
import Option from '../components/Option'
import {MdOutlineBusinessCenter} from "react-icons/md"
import {BsBank2} from "react-icons/bs"
import {FiSettings} from "react-icons/fi"
import Area from "../../components/Area"

export default function Home() {
  const [area, setArea] = React.useState<undefined|string>(undefined)

  return (
    <div className='w-full md:w-1/2'>
      <div className='w-full'>
        <Option label='Banking' Icon={<BsBank2></BsBank2>} onClick={setArea} Area="Banking"/>
        <Option label='Business' Icon={<MdOutlineBusinessCenter></MdOutlineBusinessCenter>} onClick={setArea} Area="Business"/>
        <Option label='Settings' Icon={<FiSettings/>} onClick={setArea} Area="Settings"/>
      </div>
      <div className="w-full my-2 border border-black rounded">
        <Area area={area} setArea={setArea}></Area>
      </div>
    </div>

  )
}
