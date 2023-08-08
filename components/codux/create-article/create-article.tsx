import { FC, useState } from 'react';
import { Input, Select } from '../../Reciclables/inputs';
import React, { useEffect } from 'react';
import { RunScript } from '../../../Utils/DMS';

type Category = {
    Id: string
    Date: string
    User: string
    Type: string
    Name: string
}

type Store = {
    Id: string
    Date: string
    User: string
    Store: string
}

export const CreateArticle: FC = () => {

    const [categories, SetCategories] = useState<undefined | Category[]>(undefined)
    const [Disabled, setDisabled] = React.useState(false)
    const [stores, setStores] = useState<undefined | Store[]>(undefined)
    const [currentStore, setCurrentStore] = useState<undefined | string>(undefined)
    const [StoreName, setStoreName] = useState<undefined | string>(undefined)
    const [currentCategory, setCurrentCategory] = useState<undefined | string>(undefined)
    const [CategoryName, setCategoryName] = useState<undefined | string>(undefined)
    useEffect(() => {
        //------ Missing User Data ------//
        RunScript("SettingsOps", "getCategories", { User: "chuygbg" }).then((e: Category[]) => { SetCategories(e) })
        RunScript("SettingsOps", "getStores", { User: "chuygbg" }).then((e: Store[]) => { setStores(e) })
    }, [])


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setDisabled(true)
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData);
        console.log(values)
        if(values.Category === "undefined"){alert("No Category Selected, please retry");return}
        if(values.Store === "undefined"){alert("No Store Selected, please retry");return}
        //----- Missing User Data ---------//
        let res = await RunScript("SettingsOps", "createArticle", { User: "chuygbg", Article: values.Article, Unit: values.Unit, Category: CategoryName, Store: StoreName })
        if(values.StoreName !== undefined){ const resstore = await RunScript("SettingsOps", "createStore",{User:"chuygbg", Store:values.StoreName}); alert(resstore.msg)}
        if(values.NameCategory !== undefined && values.TypeCategory !== undefined){
            const resCategory = await RunScript("SettingsOps","createCategory",{User:"chuygbg",Type:values.TypeCategory, Name:values.NameCategory})
            alert(resCategory.msg)
        }else if(values.NameCategory !== undefined && values.TypeCategory === undefined){alert("Category Type Undefined")}else if(values.NameCategory === undefined && values.TypeCategory !== undefined){alert("Category Name Undefined")}
        setDisabled(false)
        alert(res.msg)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p className="text-2xl">Create Acticle</p>
                <Input id="Article" label="Article Name" placeholder="What is the article name?" type="text" />
                <Input id="Unit" label="Unit of Measure" placeholder="What is the unit of measurement?" type="text" key={null} />
                <Select id="Category" label="Category" onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{setCurrentCategory(e.target.value);setCategoryName(e.target.value)}}>
                    {categories?.map((category) => {
                        return (
                            <option value={category.Name} key={category.Id}>{category.Name}</option>
                        )
                    })}
                    <option value="undefined"></option>
                    <option value="Other">Other</option>
                </Select>
                {currentCategory === "Other" && <>
                    <Select id="TypeCategory" label="Type of Category">
                        <option value="Inventory">Inventory</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Personal">Personal</option>
                    </Select>
                    <Input id="NameCategory" label="Name of category" placeholder="What is the name of the category?" type="text" onChange={(e)=>setCategoryName(e.target.value)} />
                </>}
                <Select id="Store" label="Store" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setCurrentStore(e.target.value);setStoreName(e.target.value) }}>
                    {stores?.map((store) => {
                        return <option value={store.Store} key={store.Id}>{store.Store}</option>
                    })}
                    <option value="undefined"></option>
                    <option value="Other">Other</option>
                </Select>
                {currentStore === "Other" && <Input id="StoreName" label="Store Name" placeholder="Type the new store's name" type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setStoreName(e.target.value)}} />}

                <button type='submit' className={` ${Disabled === false ? "bg-green-500 hover:bg-green-700" : "bg-gray-500 hover:bg-gray-700"} text-2xl text-white p-2 w-full rounded`} disabled={Disabled}>Run</button>
            </form>
        </div>
    )
};
