import React from 'react';
import type { FC } from 'react';
import { Select } from '../../Reciclables/inputs';
import { RunScript } from '../../../Utils/DMS';

type Props = {
    id:string,
    label:string,
    onChange?:(e:React.ChangeEvent<HTMLSelectElement>)=>void,
}

type Client = {
    Id: string
    Date: string
    User: string
    "Client Name": string
    "Client Type": string

}

export const ClientSelect: FC<Props> = ({id,label,onChange}:Props) => {
   
    const [children, setChildren] = React.useState<undefined|Client[]>(undefined)
    const [other, setOther] = React.useState(false)

    React.useEffect(()=>{
        //---- Missing user data ----***
        RunScript("SettingsOps","getClients",{User:"chuygbg"}).then((e:Client[])=>{setChildren(e);console.log(e)})
    },[])

    function handleOther(value:string){
        if(value ==="Other"){setOther(true)}
        else{
            setOther(false)
        }
    }

    return (
        <>
        <Select id={id} label={label} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{if(onChange !== undefined){onChange(e)};handleOther(e.target.value)}}>{children?.map((article)=>{return <option value={article.Id} key={article.Id}>{article["Client Name"]}</option>})}
            <option value="undefined"></option>
            <option value="Other">Other</option>
        </Select>
        {other === true && <p className="text-red-500">To create another Client, go to the settings tab and click on Create client under the Business tab . Otherwise Other will be the value recorded for client</p>}
        </>
        );
};
