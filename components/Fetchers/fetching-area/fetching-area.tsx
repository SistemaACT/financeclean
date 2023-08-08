"use client"
import React from 'react';
import Image from '../../../node_modules/next/image';
import { RunScript } from '../../../Utils/DMS';
import { CardSelector } from '../../codux/card-selector/card-selector';



export interface FetchingAreaProps {
    className?: string;
}

type Fetch = {
    MainBalance:number
    CardsCount:number
    PersonalExpense:number
    BusinessExpense:number
    CreditPaid:number
    Cards:Card[]
    IncomeGenerated:number

}

type Area = "Business" | "Banking" | "Accounting" | "Home" | "Expenses" | "Inventory"
type Card = {
    Id: string
    Date: string
    User: string
    "Card Number": number
    "Card Type": string
    "Current Balance":number
    "Initial Balance": number
    "Credit Or Debit": string
}

export const FetchingArea: React.FC<FetchingAreaProps> = ({ className = '' }) => {

    const [area, setArea] = React.useState<Area>("Banking")

    return (
        <div className="w-full">
            <div className="bg-blue-400 flex text-white p-2 space-x-2 flex-wrap">
                <p className="bg-blue-500 rounded p-1 hover:bg-blue-700 m-1" onClick={() => { setArea("Home") }}>Home</p>
                <p className="bg-blue-500 rounded p-1 hover:bg-blue-700 m-1" onClick={() => { setArea("Banking") }}>Banking</p>
                <p className="bg-blue-500 rounded p-1 hover:bg-blue-700 m-1" onClick={() => { setArea("Business") }}>Business</p>
                <p className="bg-blue-500 rounded p-1 hover:bg-blue-700 m-1" onClick={() => { setArea("Accounting") }}>Accounting</p>
                <p className="bg-blue-500 rounded p-1 hover:bg-blue-700 m-1" onClick={() => { setArea("Expenses") }}>Expenses</p>
                <p className="bg-blue-500 rounded p-1 hover:bg-blue-700 m-1" onClick={() => { setArea("Inventory") }}>Inventory</p>
            </div>

            {HandleArea[area]}

        </div>
    )
};


const HandleArea = {
    "Home": <Home />,
    "Banking": <Banking />,
    "Business": <></>,
    "Accounting": <></>,
    "Expenses": <></>,
    "Inventory": <></>
}

function Home() {
    return (
        <div>
            <div className="flex items-center">
                <h1 className="text-2xl font-bold">Personal Finance Aplication by</h1>
                <Image src={"/ScripterLogo.png"} width={150} height={50} alt="Logo" className="p-2"></Image>
            </div>
            <p>Welcome to your personal finance app. Here you will be able to record diferent kinds of transactions. This tool serves to keep track of your personal and business expenses. It&apos;s meant to facilitate knowing where your money is being spent and what you own.</p>
            <h2 className="text-xl font-bold p-2">How Does the aplication work?</h2>
            <p>This aplication saves financial information from the user, to allow the computer to create a record of purchases, sales and other financial related transactions. This is achived by having the user save his card into the system. Then this will allow the user to decide which transactions belong to which card.</p>
            <p>Diferent transactions have diferent effects on the card's current balance. However the transactions have names that indicate what they do. Here will be explained the different functions and the efects they have on your data. </p>
            <p>It's important to note, that the user will only have access to his own data and your data is protected.</p>
            <h3 className="text-xl font-bold p-2">Banking</h3>
            <p>The banking section allows the user to create cards and delete cards, create income reports, make purchases either for yourself or for your business and will allow you to manage your credit card debt.</p>
            <h4 className="text-xl">Cards</h4>
            <h4 className="text-xl">Purchase</h4>
            <h4 className="text-xl">Credit Cards Payment</h4>
        </div>
    )

}

function Banking() {

    const [data, setData] = React.useState<undefined | Fetch>(undefined)
    const [card, setCard] = React.useState<undefined |Card>(undefined)

    React.useEffect(()=>{
        //---- Missing User Data ----//
        RunScript("FetchingOps","getBanking",{User:"chuygbg"}).then((e:Fetch)=>setData(e))
    },[])

    console.log(data)

    function handleCard(e:React.ChangeEvent<HTMLSelectElement>){
        if(data !== undefined && data.Cards !== undefined){
            let card = data.Cards.filter((card)=>{return(card.Id===e.target.value)})[0]
            setCard(card)
            return
        }else{
            alert("Please wait for the cards to finish loading")
            return
        }
    }

    return (
        <div>
            <div className="flex justify-between p-2 border m-2 border-black">
                <div className="w-full md:w-1/2 border-r-2 border-black m-1">
                    <h2>Main Account Current Balance : ${data?.MainBalance}</h2>
                    <h2>Cards Created : {data?.CardsCount}</h2>
                    <h2>Income Generated Last Month : ${data?.IncomeGenerated}</h2>
                </div>
                <div className="w-full md:w-1/2 m-1">
                    <h2>Personal Expenses of Last Month : ${data?.PersonalExpense}</h2>
                    <h2>Business Expenses of Last Month : ${data?.BusinessExpense}</h2>
                    <h2>Credit Payed Last Month : ${data?.CreditPaid}</h2>
                </div>

            </div>
            <CardSelector id="Card" label="Select Card" />
        </div>
    )
}