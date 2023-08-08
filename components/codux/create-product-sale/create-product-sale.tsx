import type { FC } from 'react';
import React from "react"
import { RunScript } from '../../../Utils/DMS';
import { Input } from '../../Reciclables/inputs';
import { CategorySelect } from '../category-select/category-select';

export const CreateProductSale: FC = () => {
    const [Disabled, setDisabled] = React.useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setDisabled(true)
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData);
        console.log(values)

        //----- Missing User Data ---------//
        let res = await RunScript("SettingsOps", "createProduct", { User: "chuygbg", Name: values.Name, Description: values.Description, Price:values.Price, Category:values.Category })

        setDisabled(false)
        alert(res.msg)
    }

    return <form onSubmit={handleSubmit}>
        <p className="text-2xl">Create Product</p>
        <Input id="Name" label="Product Name" placeholder="What is the product name?" type="text" />
        <Input id="Description" label="Description" placeholder="Describe the product" type="text" />
        <Input id="Price" label="Price" placeholder="Establish Price For Service" type="number" />
        <CategorySelect id="Category" label="Category"/>
 
        <button type='submit' className={` ${Disabled === false ? "bg-green-500 hover:bg-green-700" : "bg-gray-500 hover:bg-gray-700"} text-2xl text-white p-2 w-full rounded`} disabled={Disabled}>Run</button>
    </form>;
};
