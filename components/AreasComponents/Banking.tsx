"use client"
import React, { FormEvent, ReactNode, useEffect } from 'react'
import Option from '../Option'
import {BsFillCreditCard2BackFill} from "react-icons/bs"
import {RiMoneyDollarCircleLine} from "react-icons/ri"
import {GiReceiveMoney} from "react-icons/gi"
import {BsCreditCard2Back} from "react-icons/bs"
import {MdInventory, MdBusinessCenter, MdShoppingCart} from "react-icons/md"
import { Input, Select } from '../Reciclables/inputs'
import { RunScript } from '../../Utils/DMS'
import { Group } from '../Reciclables/groups'
import { PersonalPurchase } from '../codux/personal-purchase/personal-purchase'
import { PurchaseEquipment } from '../codux/purchase-equipment/purchase-equipment'
import { PurchaseInventory } from '../codux/purchase-inventory/purchase-inventory'
import { PayCredit } from '../codux/pay-credit/pay-credit'





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

type Income = {
    "Id": string
    "Date": string
    "User": string
    "Card": string
    "Motive": string
    "Amount":number

}

export default function Banking() {
    const [section, setSection] = React.useState<undefined|string>(undefined)
  
    return (
    <div>
        {section === undefined && <BankingOptions onClick={setSection}></BankingOptions>}
        {section !== undefined && HandleSection[section]}
    </div>
  )
}


function BankingOptions({onClick}:{onClick:(e:string)=>void}){

    return (
        <>
        <Group label='Cards' Icon={<BsFillCreditCard2BackFill/>}>
            <Option label='Add Card' Area="Add Card" onClick={onClick} Icon={<BsFillCreditCard2BackFill className="text-green-500"></BsFillCreditCard2BackFill>}/>
            <Option label='See Cards' Area="See Cards" onClick={onClick} Icon={<BsFillCreditCard2BackFill className="text-yellow-500"></BsFillCreditCard2BackFill>}/>
            <Option label='Remove Card' Area="Remove Card" onClick={onClick} Icon={<BsFillCreditCard2BackFill className="text-red-500"></BsFillCreditCard2BackFill>}/>
        </Group>
        <Group label='Income' Icon={<RiMoneyDollarCircleLine/>}>
            <Option label="Report Income" Area="Report Income" onClick={onClick} Icon={<RiMoneyDollarCircleLine className="text-green-500"></RiMoneyDollarCircleLine>}></Option>
        </Group>
        <Group label = "Purchase" Icon={<BsCreditCard2Back></BsCreditCard2Back>}>
            <Option label='Inventory' Area="Inventory" onClick={onClick} Icon={<MdInventory></MdInventory>}/>
            <Option label='Equipment' Area="Equipment" onClick={onClick} Icon={<MdBusinessCenter></MdBusinessCenter>}/>
            <Option label='Personal Purchase' Area="Personal Purchase" onClick={onClick} Icon={<MdShoppingCart></MdShoppingCart>}/>
        </Group>
        <Option label="Credit Payment" Area="Credit Payment" onClick={onClick} Icon={<GiReceiveMoney></GiReceiveMoney>}></Option>
        </>
    )
}

let HandleSection: {[key:string]:ReactNode} = {
    "Add Card": <AddCard></AddCard>,
    "See Cards":<SeeCard></SeeCard>,
    "Remove Card": <RemoveCard></RemoveCard>,
    "Report Income": <ReportIncome></ReportIncome>,
    "Personal Purchase": <PersonalPurchase/>,
    "Inventory": <PurchaseInventory/>,
    "Equipment": <PurchaseEquipment/>,
    "Credit Payment":<PayCredit></PayCredit>,
}

function AddCard(){

    const [Disabled, setDisabled] = React.useState(false)

    async function handleSumbit(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        setDisabled(!Disabled)
        const formData = new FormData(event.currentTarget);
        const values = Object.fromEntries(formData);

        ///-------- Missing user information --------//////
        values.User = "chuygbg"

        const res = await RunScript("BankingOps", "addCard",{User:values.User,Number:parseInt(values.Number as string), Type:values.Type, Balance:values.Balance, Credit:values.Credit})

        setDisabled(false)
        alert(res.msg)
    }

    return(
        <form onSubmit={handleSumbit}>
            <Input id="Number" placeholder='Insert Card Number' label='Card Number' type='number'></Input>
            <Select id="Type" label='Card Type'>
                <option value="Main">Main</option>
                <option value="Business">Business</option>
                <option value="Personal">Personal</option>
            </Select>
            <Select id="Credit" label='Credit or Debit'>
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
            </Select>
            <Input id="Balance" placeholder='Insert Current Card Balance' label='Card Balance' type='number'></Input>
            <button type='submit' className={` ${Disabled === false ? "bg-green-500 hover:bg-green-700" : "bg-gray-500 hover:bg-gray-700"} text-2xl text-white p-2 w-full`} disabled={Disabled}>Run</button>
        </form>
    )
}




function SeeCard(){
    

    const [cards, setCards] = React.useState<undefined|[Card]>(undefined)
    const headers = ["Card Number", "Use", "Current Balance", "Initial Balance", "Card Type"]

    ///-------- Missing user information --------//////
    useEffect(()=>{
        RunScript("BankingOps", "getCards",{User:"chuygbg"}).then((e:[Card])=>setCards(e))

    },[])

    console.log(cards)

    return(
        <div className='border-black border m-2 rounded'>
            <div className='flex'>
                {headers.map((header)=>{return(<div className='w-1/5 bg-black p-1 text-center text-white border-white border'>{header}</div>)})}
            </div>
            {cards?.map((card)=>{
                let values =  Object.values(card)
                let keys = Object.keys(card)
                return(<div className='flex p-1  text-center border-black border'>
                    {values.map((value,i)=>{
                        if(headers.includes(keys[i])  || keys[i]== "Credit Or Debit"){
                        return(<div className='w-1/5 p-1 break-words'>{value}</div>)
                        }
                        else{return(null)}
                    })}
                </div>)
            })}
        </div>
    )
}

function RemoveCard(){

    const [cards, setCards] = React.useState<undefined|Card[]>(undefined)
    const [Disabled, setDisabled] = React.useState(false)
    
    ///-------- Missing user information --------//////
    useEffect(()=>{
        RunScript("BankingOps", "getCards",{User:"chuygbg"}).then((e:Card[])=>setCards(e))

    },[])

    async function handleSumbit(e:FormEvent<HTMLFormElement>){
        e.preventDefault()
        setDisabled(!Disabled)
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData);

        const res = await RunScript("BankingOps","deleteCard", {Id: values["Card Number"]})
        const filtered = cards!.filter((card)=>{
            return (card.Id !== values["Card Number"])
        })

        setCards(filtered)
        alert(res.msg)
    }

    return (
        <form className=' p-2 ' onSubmit={handleSumbit}>
            <p className='text-2xl'>Delete Card</p>
            <Select id="Card Number" label="Select Card">
                {cards?.map((card)=>{
                    return (<option value={card.Id}>{card['Card Number']}</option>)
                })}
            </Select>
            <button disabled={Disabled} className={`${Disabled == false ? "bg-red-500 hover:bg-red-700": "bg-gray-500 hover:bg-gray-700"} text-2xl text-white text-bold w-full rounded my-2 p-2`}>Delete</button>
        </form>
    )

}

function ReportIncome(){
    const [cards, setCards] = React.useState<undefined|Card[]>(undefined)
    const [Disabled, setDisabled] = React.useState(false)
    
    ///-------- Missing user information --------//////
    useEffect(()=>{
        RunScript("BankingOps", "getCards",{User:"chuygbg"}).then((e:Card[])=>setCards(e))

    },[])

    async function handleSumbit(e:FormEvent<HTMLFormElement>){
        e.preventDefault()
        setDisabled(!Disabled)
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData);

        ///-------- Missing user information --------//////
        values.User = "chuygbg"

        const res = await RunScript("BankingOps","createIncome", {User: values.User,"Card":values.Card, "Motive":values.Motive, "Amount":values.Amount})

        alert(res.msg)
        setDisabled(false)
    }


    return (
        <form onSubmit={handleSumbit}>
                <Select id="Card" label='Select Card'>
                    {cards?.map((card)=>{return(<option key={card.Id} value={card.Id}>{card['Card Number']}</option>)})}
                </Select>
                <Input id="Motive" type='text' label='Motive of Income' placeholder='State the Motive of Income'></Input>
                <Input id="Amount" type="number" label="Amount of Income" placeholder='Enter the amount of income recived'></Input>
                <button type='submit' className={` ${Disabled === false ? "bg-green-500 hover:bg-green-700" : "bg-gray-500 hover:bg-gray-700"} text-2xl text-white p-2 w-full`} disabled={Disabled}>Run</button>
        </form>
    )
}
