import type { FC } from 'react';
import React from "react"
import { RunScript } from '../../../Utils/DMS';
import { Input, Select } from '../../Reciclables/inputs';

export const CreateService: FC = () => {
    const [Disabled, setDisabled] = React.useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setDisabled(true)
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData);
        console.log(values)

        //----- Missing User Data ---------//
        let res = await RunScript("SettingsOps", "createService", { User: "chuygbg", Name: values.Name, Description: values.Description, Price:values.Price,Time:values.Time,DurationType:values.DurationType })

        setDisabled(false)
        alert(res.msg)
    }

    return <form onSubmit={handleSubmit}>
        <p className="text-2xl">Create Service</p>
        <Input id="Name" label="Service Name" placeholder="What is the service name?" type="text" />
        <Input id="Description" label="Description" placeholder="Describe the service" type="text" />
        <Input id="Price" label="Price" placeholder="Establish Price For Service" type="number" />
        <div>
            <p className="p-2">State the time as a whole number and use duration to determine the lenght of the period</p>
            <Input id="Time" label="Time" placeholder="Time in integer format" type="number" />
            <Select id="DurationType" label="Duration">
                <option value="Minutes">Minutes</option>
                <option value="Hours">Hours</option>
                <option value="Days">Days</option>
                <option value="Weeks">Weeks</option>
                <option value="Half Months">Half Months</option>
                <option value="Months">Months</option>
            </Select>
        </div>
        <button type='submit' className={` ${Disabled === false ? "bg-green-500 hover:bg-green-700" : "bg-gray-500 hover:bg-gray-700"} text-2xl text-white p-2 w-full rounded`} disabled={Disabled}>Run</button>
    </form>;
};
