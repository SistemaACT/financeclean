import React from 'react';
import type { FC } from 'react';
import { Select } from '../Reciclables/inputs';
import { RunScript } from '../../Utils/DMS';

type Props = {
    id:string,
    label:string,
    onChange?:(e:React.ChangeEvent<HTMLSelectElement>)=>void,
}

type Article = {
    Id: string
    Date: string
    User: string
    Article: string
    Unit: string
    Category: string
    Store: string
}

export const ArticleSelect: FC<Props> = ({id,label,onChange}:Props) => {

    const [children, setChildren] = React.useState<undefined|Article[]>(undefined)
    const [other, setOther] = React.useState(false)

    React.useEffect(()=>{
        //---- Missing user data ----***
        RunScript("SettingsOps","getArticles",{User:"chuygbg"}).then((e:Article[])=>{setChildren(e);console.log(e)})
    },[])

    function handleOther(value:string){
        if(value ==="Other"){setOther(true)}
        else{
            setOther(false)
        }
    }

    return (
        <>
        <Select id={id} label={label} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{if(onChange !== undefined){onChange(e)};handleOther(e.target.value)}}>{children?.map((article)=>{return <option value={article.Id} key={article.Id}>{article.Article}</option>})}
            <option value="undefined"></option>
            <option value="Other">Other</option>
        </Select>
        {other === true && <p className="text-red-500">To create another article, go to the settings tab and click on Create Article under the Inventory tab . Otherwise this purchase will record other as the article purchased</p>}
        </>
        );
};
