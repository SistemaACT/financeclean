import { FC, useState } from 'react';
import { Input, Select } from '../../Reciclables/inputs';
import React, { useEffect } from 'react';
import { RunScript } from '../../../Utils/DMS';

type Category = {
    Id: string
    Date: string
    User: string
    Type: string
    Name: string
}

type Props = {
    id:string,
    label:string,
    onChange?:(e:React.ChangeEvent<HTMLSelectElement>)=>void,
}

export const CategorySelect: FC<Props> =  ({id,label,onChange}:Props) => {

    const [children, setChildren] = React.useState<undefined|Category[]>(undefined)
    const [other, setOther] = React.useState(false)

    useEffect(()=>{
        RunScript("SettingsOps", "getCategories", { User: "chuygbg" }).then((e: Category[]) => { setChildren(e) })

    },[])
    console.log(children)
    function handleOther(value:string){
        if(value ==="Other"){setOther(true)}
        else{
            setOther(false)
        }
    }

    return (
        <>
        <Select id={id} label={label} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{if(onChange !== undefined){onChange(e)};handleOther(e.target.value)}}>{children?.map((article)=>{return <option value={article.Id} key={article.Id}>{article.Name}</option>})}
            <option value="undefined"></option>
            <option value="Other">Other</option>
        </Select>
        {other === true && <p className="text-red-500">To create another Category, go to the settings tab and click on Create Category under the Inventory tab . Otherwise this other will be saved as the category value</p>}
        </>
        );
};
