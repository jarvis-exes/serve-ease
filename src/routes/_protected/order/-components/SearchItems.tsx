import Input from '@/components/common/Input'
import type { CartItem, ItemType } from '@/models';
import { useState, type Dispatch, type FC, type SetStateAction } from 'react';
import ItemCard from './ItemCard';

type SearchItemsProps = {
    items: ItemType[];
    setCart: Dispatch<SetStateAction<CartItem[]>>
}

const SearchItems: FC<SearchItemsProps> = ({ items, setCart }) => {
    const [search, setSearch] = useState('');
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    return (
        <div className='relative w-full md:w-1/3'>
            <div className=''>
                <Input
                    placeholder='Search for items'
                    onChange={(e) => setSearch(e.target.value)}
                    color='white'
                    inputClasses='bg-slate-300'
                />
            </div>
            {search &&
                <div className='p-2 mt-2 w-full h-fit max-h-175 overflow-auto absolute z-2 rounded-2xl shadow-2xl bg-linear-to-b from-slate-300 to-white'>
                    {filteredItems.length > 0 ?
                        <div className='grid grid-cols-2 gap-2'>
                            {filteredItems.map(item =>
                                <ItemCard key={item._id} item={item} setCart={setCart} />
                            )}
                        </div>
                        :
                        <div className='w-full my-20 flex items-center justify-center font-bold'>No Items</div>
                    }
                </div>}
        </div>
    )
}

export default SearchItems