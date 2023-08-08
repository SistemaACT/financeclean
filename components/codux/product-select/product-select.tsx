import React from 'react';
import type { FC } from 'react';
import { Select } from '../../Reciclables/inputs';
import { RunScript } from '../../../Utils/DMS';

type Props = {
    id:string,
    label:string,
    onChange?:(e:React.ChangeEvent<HTMLSelectElement>)=>void,
}

type Product = {
    Id: string
    Date: string
    User: string
    Name: string
    Description: string
    Price: number
    Category: string
}

export const ProductSelect: FC<Props> = ({id,label,onChange}:Props) => {
    
    const [children, setChildren] = React.useState<undefined|Product[]>(undefined)
    const [other, setOther] = React.useState(false)

    React.useEffect(()=>{
        //---- Missing user data ----***
        RunScript("SettingsOps","getProducts",{User:"chuygbg"}).then((e:Product[])=>{setChildren(e);console.log(e)})
    },[])

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
        {other === true && <p className="text-red-500">To create another product, go to the settings tab and click on Create Product under the Business tab . Otherwise other will be the recorded product value</p>}
        </>
        );
};
