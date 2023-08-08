import React from 'react';
import type { FC } from 'react';
import { Select } from '../../Reciclables/inputs';
import { RunScript } from '../../../Utils/DMS';

type Props = {
    id:string,
    label:string,
    onChange?:(e:React.ChangeEvent<HTMLSelectElement>)=>void,
}

type Service = {
    Id: string
    Date: string
    User: string
    "Service Name": string
    "Description": string

}
export const ServiceSelect: FC<Props> = ({id,label,onChange}:Props) => {
    const [children, setChildren] = React.useState<undefined|Service[]>(undefined)
    const [other, setOther] = React.useState(false)

    React.useEffect(()=>{
        //---- Missing user data ----***
        RunScript("SettingsOps","getServices",{User:"chuygbg"}).then((e:Service[])=>{setChildren(e);console.log(e)})
    },[])

    function handleOther(value:string){
        if(value ==="Other"){setOther(true)}
        else{
            setOther(false)
        }
    }

    return (
        <>
        <Select id={id} label={label} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{if(onChange !== undefined){onChange(e)};handleOther(e.target.value)}}>{children?.map((article)=>{return <option value={article.Id} key={article.Id}>{article["Service Name"]}</option>})}
            <option value="undefined"></option>
            <option value="Other">Other</option>
        </Select>
        {other === true && <p className="text-red-500">To create another Service, go to the settings tab and click on Create Service under the Business tab . Otherwise Other will be the value recorded for client</p>}
        </>
        );
};
