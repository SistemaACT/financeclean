import React from 'react';
import { Input, Select } from '../../Reciclables/inputs';
import { RunScript } from '../../../Utils/DMS'
import { ArticleSelect } from '../../article-select/article-select';

export interface PurchaseInventoryProps {
    className?: string;
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

type Category = {
    Id: string
    Date: string
    User: string
    Type: string
    Name: string
}

export const PurchaseInventory: React.FC<PurchaseInventoryProps> = ({ className = '' }) => {

    const [Disabled, setDisabled] = React.useState(false)
    const [articles, setArticles] = React.useState<undefined | Article[]>(undefined)

    ///-------- Missing user information --------//////
    React.useEffect(() => {
        RunScript("SettingsOps", "getArticles", { User: "chuygbg" }).then((e: Article[]) => setArticles(e))

    }, [])
    React.useEffect

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setDisabled(!Disabled)
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData);
        let Consume
        if (values.Consume === "true") { Consume = true } else { Consume = false }
        const Category = articles!.filter((article) => { return (article.Article == values.Article) })[0]
        ///-------- Missing user information --------//////
        values.User = "chuygbg"

        const res = await RunScript("InventoryOps", "addToInventory", { User: values.User, Article: values.Article, Price: values.Price, Category: Category.Category, Consume: Consume, Quantity: values.Quantity, Motive:values.Motive })

        alert(res.msg)
        setDisabled(false)
    }




    return (
        <form>
            <p className="text-2xl">Buying Inventory</p>
            <ArticleSelect id="Article" label="Article" />
            <Input id="Price" label="Unit Price" placeholder="What was the cost?" type="number" />
            <Input id="Quantity" label="Quantity" placeholder="How much did you buy?" type="number" />
            <Input id="Motive" label="Motive" placeholder="What is the motive of the purchase" type="text" />
            <Select id="Consume" label="Is it consumable?">
                <option value="true">Yes</option>
                <option value="false">No</option>
            </Select>
            <button type='submit' className={` ${Disabled === false ? "bg-green-500 hover:bg-green-700" : "bg-gray-500 hover:bg-gray-700"} text-2xl text-white p-2 w-full rounded`} disabled={Disabled}>Run</button>
        </form>
    )
};