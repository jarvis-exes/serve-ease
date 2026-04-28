import Card from '@/components/common/Card'
import type { CartItem, ItemType } from '@/models/menu.model'
import type { Dispatch, FC, SetStateAction } from 'react';
import ItemCard from './ItemCard';
import { IoFastFoodSharp } from "react-icons/io5";

type ItemsPannelProps = {
    items?: ItemType[];
    setCart: Dispatch<SetStateAction<CartItem[]>>
}

const ItemsPannel: FC<ItemsPannelProps> = ({ items, setCart }) => {

    return (
        <Card shadow='none' className="flex-1 md:flex-6 p-0 pb-2 h-full flex flex-col">
            <div className="px-3 pt-3 rounded-t-2xl text-2xl text-slate-800">
                Items
            </div>

            {!items &&
                <div className='h-full w-full flex flex-col gap-5 items-center justify-center'>
                    <IoFastFoodSharp className='w-32 h-32 text-slate-800'/>
                    <span className='font-semibold text-slate-800'>Please Select Category fom Left Menu</span>
                </div>
            }

            <div className='p-2 pb-9 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-auto'>
                {items?.map(item =>
                    item.isActive && <ItemCard key={item._id} item={item} setCart={setCart} />
                )}
            </div>
        </Card>
    )
}

export default ItemsPannel