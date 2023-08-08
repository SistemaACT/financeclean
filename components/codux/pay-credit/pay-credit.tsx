import type { FC } from 'react';
import { SelectCreditCard } from '../select-credit-card/select-credit-card';
import { CardSelector } from '../card-selector/card-selector';
import { Select, Input } from '../../Reciclables/inputs';
import React from "react"
import { RunScript } from '../../../Utils/DMS';

type PaymentType = "Card" | "Cash"

export const PayCredit: FC = () => {
    const [Disabled, setDisabled] = React.useState(false)
    const [cardOrCash, setCardOrCash] = React.useState<PaymentType>("Card")
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setDisabled(true)
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData);
        console.log(values)
        let card
        if (cardOrCash === "Cash") { card = "Cash" } else { card = values.Card }

        //----- Missing User Data ---------//
        let res = await RunScript("BankingOps", "payCreditCard", { User: "chuygbg", Card1: values.CreditCard, Card2: card, Money: values.Money })

        setDisabled(false)
        alert(res.msg)
    }

    console.log("here")

    return <form onSubmit={handleSubmit}>
        <SelectCreditCard id="CreditCard" label="Credit Card" />
        <Select id="PaymentMethod" label="Payment Method" onChange={(e) => { setCardOrCash(e.target.value as PaymentType) }}>
            <option key="Card" value="Card">Card</option>
            <option key = "Cash" value="Cash">Cash</option>
        </Select>
        {cardOrCash === "Card" && <CardSelector id="Card" label="Paying Card" />}
        <Input id="Money" label="Money Transfered" placeholder="Amount of money transfered" type="number" />
        <button type='submit' className={` ${Disabled === false ? "bg-green-500 hover:bg-green-700" : "bg-gray-500 hover:bg-gray-700"} text-2xl text-white p-2 w-full rounded`} disabled={Disabled}>Run</button>
    </form>;
};
