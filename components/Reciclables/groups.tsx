import { ReactNode, useState } from "react"


type Grouping = {
    children:ReactNode
    label:string
    Icon: ReactNode
}

export const Group = ({children,label,Icon}:Grouping) =>{

    const [display, setDisplay] = useState<boolean>(false)

    return(
        <div className="border-2 border-black">
            <div
            className=" rounded flex w-full p-2 items-center space-x-2 text-2xl justify-center hover:bg-gray-200" 
            onClick={()=>setDisplay(!display)}>
                 <div className="text-blue-700">{Icon}</div>
                <p>{label}</p> 
            </div>
            <div className={`${display === true ? "flex":"hidden"} flex-col w-full`}>
                {children}
            </div>
        </div>
    )

}