import React from 'react';
import type { FC } from 'react';
import { Select } from '../../Reciclables/inputs';
import { RunScript } from '../../../Utils/DMS';

type Props = {
    id:string,
    label:string,
    onChange?:(e:React.ChangeEvent<HTMLSelectElement>)=>void,
}
type Card = {
    Id: string
    Date: string
    User: string
    "Card Number": string
    "Card Type": string
    "Current Balance": number
    "Initial Balance": number
    "Credit Or Debit": string
}


export const CardSelector:  FC<Props> = ({id,label,onChange}:Props) => {
    const [children, setChildren] = React.useState<undefined|Card[]>(undefined)
    const [other, setOther] = React.useState(false)

    React.useEffect(()=>{
        RunScript("BankingOps", "getCards",{User:"chuygbg"}).then((e:Card[])=>setChildren(e))
    },[])

    function handleOther(value:string){
        if(value ==="Other"){setOther(true)}
        else{
            setOther(false)
        }
    }

    return (
        <>
        <Select id={id} label={label} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{if(onChange !== undefined){onChange(e)};handleOther(e.target.value)}}>{children?.map((article)=>{return <option value={article.Id} key={article.Id}>{article["Card Number"]}</option>})}
            <option value="undefined"></option>
            <option value="Other">Other</option>
        </Select>
        {other === true && <p className="text-red-500">To create another Card, go to the Banking tab and click on Add Card under the Cards tab . Otherwise this other will be saved as the card</p>}
        </>
        );
};
