import Card from '@/components/common/Card'
import type { CartItem, ItemType } from '@/models/menu.model'
import type { Dispatch, FC, SetStateAction } from 'react';
import ItemCard from './ItemCard';

type ItemsPannelProps = {
    items?: ItemType[];
    setCart: Dispatch<SetStateAction<CartItem[]>>
}

const ItemsPannel: FC<ItemsPannelProps> = ({ items, setCart }) => {

    return (
        <Card className="flex-6 p-0 h-full flex flex-col">
            <div className="bg-green-light px-7 py-2 rounded-t-2xl text-xl font-bold">
                Items
            </div>

            <div className='p-3 pb-9 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-auto'>
                {items?.map(item =>
                    item.isActive && <ItemCard item={item} setCart={setCart}/>
                )}
            </div>
        </Card>
    )
}

export default ItemsPannel