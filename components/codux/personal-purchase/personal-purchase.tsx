import React from 'react';
import { Input, Select } from '../../Reciclables/inputs';
import { RunScript } from '../../../Utils/DMS'
import { ArticleSelect } from '../../article-select/article-select';

export interface PersonalPurchaseProps {
    className?: string;
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

export const PersonalPurchase: React.FC<PersonalPurchaseProps> = ({ className = '' }) => {


    const [cards, setCards] = React.useState<undefined | [Card]>(undefined)
    const [Disabled, setDisabled] = React.useState(false)

    ///-------- Missing user information --------//////
    React.useEffect(() => {
        RunScript("BankingOps", "getCards", { User: "chuygbg" }).then((e: [Card]) => setCards(e))

    }, [])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setDisabled(!Disabled)
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData);
        console.log(values)

        ///-------- Missing user information --------//////
        values.User = "chuygbg"

        const res = await RunScript("BankingOps", "createPurchase", { User: values.User, "Card": values.Card, "Motive": values.Motive, "Amount": Number(values.Amount)*Number(values.Quantity), Article: values.Article, "Unit Price":values.Amount, Quantity:values.Quantity })

        alert(res.msg)
        setDisabled(false)
    }

    return (
        <form onSubmit={handleSubmit} className="p-2">
            <p className="text-2xl">Generate Purchase</p>
            <Select id="Card" label="Select Card">
                {cards?.map((card) => (<option value={card.Id}>{card["Card Number"]}</option>))}
            </Select>
            <Input id="Amount" label="Unit Price" placeholder="Insert Price" type="number" />
            <Input id="Quantity" label="Quantity" placeholder="How many did you buy?" type="number" />
            <ArticleSelect id="Article" label="Article" />
            <Input id="Motive" label="Motive" placeholder="Why did you buy it?" type="text" />
            <button type='submit' className={` ${Disabled === false ? "bg-green-500 hover:bg-green-700" : "bg-gray-500 hover:bg-gray-700"} text-2xl text-white p-2 w-full rounded`} disabled={Disabled}>Run</button>
        </form>
    )
};