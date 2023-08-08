import React, {ReactNode} from 'react'
import {MdInventory} from "react-icons/md"
import {FcBusinessman} from "react-icons/fc"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {GiForklift} from "react-icons/gi"
import {BiSolidBusiness} from "react-icons/bi"
import {BsFillCartPlusFill} from "react-icons/bs"
import {FaHammer} from "react-icons/fa"
import { CreateCategory } from '../codux/create-category/create-category'
import Option from '../Option'
import { CreateArticle } from '../codux/create-article/create-article'
import { Group } from '../Reciclables/groups'
import { CreateClient } from '../codux/create-client/create-client'
import { CreateService } from '../codux/create-service/create-service'
import { CreateProductSale } from '../codux/create-product-sale/create-product-sale'

export default function Settings() {
    const [section, setSection] = React.useState<undefined|string>(undefined)
  return (
    <div>
        {section === undefined && <PurchaseOptions onClick={setSection}></PurchaseOptions>}
        {section !== undefined && HandleSection[section]}
    </div>
  )
}

function PurchaseOptions({onClick}:{onClick:(e:string)=>void}){
    return(
        <>
        <Group label='Inventory' Icon={<GiForklift></GiForklift>}>
          <Option label='Create Article' Area="Article" onClick={onClick} Icon={<AiOutlineShoppingCart></AiOutlineShoppingCart>}/>
          <Option label='Create Category' Area="Category" onClick={onClick} Icon={<MdInventory></MdInventory>}/>
        </Group>
        <Group label='Business' Icon={<BiSolidBusiness></BiSolidBusiness>}>
          <Option label='Create Client' Area="NewClient" onClick={onClick} Icon={<FcBusinessman></FcBusinessman>}/>
          <Option label='Create Service' Area="NewService" onClick={onClick} Icon={<FaHammer></FaHammer>}/>
          <Option label='Create Product' Area="NewProduct" onClick={onClick} Icon={<BsFillCartPlusFill></BsFillCartPlusFill>}/>
        </Group>

        </>
    )
}

let HandleSection: {[key:string]:ReactNode} = {
  Category: <CreateCategory/>,
  Article: <CreateArticle/>,
  NewClient: <CreateClient/>,
  NewService:<CreateService/>,
  NewProduct:<CreateProductSale/>

}