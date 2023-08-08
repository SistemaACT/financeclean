import type { FC } from 'react';
import React from "react"
import { Input, Select } from '../../Reciclables/inputs';
import { ClientSelect } from '../client-select/client-select';
import { ServiceSelect } from '../service-select/service-select';
import { CreateProductSale } from '../create-product-sale/create-product-sale';
import { ProductSelect } from '../product-select/product-select';
import { RunScript } from '../../../Utils/DMS';
import { CardSelector } from '../card-selector/card-selector';


type PaymentMethods = "Card" | "Cash" | "Accounts Recivable"

export const CreateSale: FC = () => {
    const [Disabled, setDisabled] = React.useState(false)
    const [ProductOrService, setProductOrService] = React.useState<undefined | boolean>(true)
    const [PaymentMethod, setPaymentMethod] = React.useState<PaymentMethods>("Cash")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setDisabled(true)
        if (ProductOrService === undefined) { alert("Please select if sale is a product or a service"); setDisabled(false); return }
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData);
        console.log(values)

        //----- Missing User Data ---------//
        let res = await RunScript("BusinessOps", "createSale", { User: "chuygbg", Money: Number(values.Price)*Number(values.Quantity), Service: values.Service, Client: values.Client, Paid: values.Paid, Type: PaymentMethod, Card: values.Card, Quantity:values.Quantity })

        setDisabled(false)
        alert(res.msg)
    }

    return <form onSubmit={handleSubmit}>


        <Select id="Type" label="Type of Sale" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { if (e.target.value === "Service") { setProductOrService(true) } else if (e.target.value === "Product") { setProductOrService(false) } }}>
            <option value="Service">Service</option>
            <option value="Product">Product</option>
        </Select>
        <ClientSelect id="Client" label="Select Client" />
        {ProductOrService === true && <ServiceSelect id="Service" label="Service" />}
        {ProductOrService === false && <ProductSelect id="Service" label="Product" />}
        <Select id="Paid" label="Payment Type" onChange={(e) => { setPaymentMethod(e.target.value as PaymentMethods) }}>
            <option value="Cash">Payed In Cash</option>
            <option value="Accounts Recivable">Accounts Recivable</option>
            <option value="Card">Paid with Card</option>
        </Select>
        {PaymentMethod === "Card" && <CardSelector id="Card" label="Select Card" />}
        <Input id="Price" label="Price Per Unit" placeholder="What was the price per unit?" type="number" step={0.01} />
        <Input id="Quantity" label="Amount Sold" type="number" placeholder="What was the amout of units sold" />
        <button type='submit' className={` ${Disabled === false ? "bg-green-500 hover:bg-green-700" : "bg-gray-500 hover:bg-gray-700"} text-2xl text-white p-2 w-full rounded`} disabled={Disabled}>Run</button>







    </form>;
};
