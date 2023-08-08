import type { FC } from 'react';
import { Input, Select } from '../../Reciclables/inputs';
import React from "react"
import { RunScript } from '../../../Utils/DMS'

export const CreateCategory: FC = () => {
    const [Disabled, setDisabled] = React.useState(false)

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setDisabled(!Disabled)
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData);
     

        ///-------- Missing user information --------//////
        values.User = "chuygbg"

        const res = await RunScript("SettingsOps","createCategory", {User: values.User,Type:values.Type, Name:values.Name})

        alert(res.msg)
        setDisabled(false)
    }

    return <form onSubmit={handleSubmit}>
        <Select id="Type" label="Type">
            <option value="Inventory">Inventory</option>
            <option value="Equipment">Equipment</option>
            <option value="Personal">Personal</option>
        </Select>
        <Input id="Name" label="Name of category" placeholder="What is the name of the category?" type="text" />
         <button type='submit' className={` ${Disabled === false ? "bg-green-500 hover:bg-green-700" : "bg-gray-500 hover:bg-gray-700"} text-2xl text-white p-2 w-full rounded`} disabled={Disabled}>Run</button>
    </form>;
};
