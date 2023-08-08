import type { FC } from 'react';
import React from "react"
import { RunScript } from '../../../Utils/DMS';
import { Input, Select } from '../../Reciclables/inputs';

export const CreateClient: FC = () => {
    const [Disabled, setDisabled] = React.useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setDisabled(true)
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData);
        console.log(values)

        //----- Missing User Data ---------//
        let res = await RunScript("SettingsOps", "createClient", { User: "chuygbg", Name:values.Name, Type:values.Type })
        
        setDisabled(false)
        alert(res.msg)
    }

    return <form onSubmit={handleSubmit}>
        <p className="text-2xl">Create Client</p>
        <Input id="Name" label="Client Name" placeholder="What is the clients name?" type="text" />
        <Select id="Type" label="Type of Client">
            <option value="Business">Business</option>
            <option value="Person">Person</option>
        </Select>
        <button type='submit' className={` ${Disabled === false ? "bg-green-500 hover:bg-green-700" : "bg-gray-500 hover:bg-gray-700"} text-2xl text-white p-2 w-full rounded`} disabled={Disabled}>Run</button>
    </form>;
};
