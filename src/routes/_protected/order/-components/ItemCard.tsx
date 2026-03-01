import Card from "@/components/common/Card";
import { Quantity } from "@/models/menu.enum";
import type { CartItem, ItemType } from "@/models/menu.model";
import type { Dispatch, FC, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

type ItemsCardProps = {
    item: ItemType;
    setCart: Dispatch<SetStateAction<CartItem[]>>
}

const ItemCard: FC<ItemsCardProps> = ({ item, setCart }) => {
    const { name, image, prices } = item;

    const handleSetCart = (size: Quantity, price: number = 0) => {
        setCart((prev) => {
            const existingItemIndex = prev.findIndex(
                (cartItem) => cartItem.itemId === item._id && cartItem.size === size
            );

            if (existingItemIndex > -1) {
                const updatedCart = [...prev];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + 1,
                };
                return updatedCart;
            }

            return [
                ...prev,
                {
                    itemId: item._id,
                    name: item.name,
                    size: size,
                    quantity: 1,
                    price: price,
                },
            ];
        });
    };

    return <Card className='h-fit flex flex-col gap-2 hover:scale-105 transition-all'>
        <div className='font-semibold text-center'>
            {name}
        </div>

        {image && <div className='w-full overflow-hidden aspect-video bg-gray-100 rounded-xl flex items-center'>
            <img
                src={image as string}
                className='rounded-xl object-cover'
            />
        </div>}
        <div className='flex w-full h-24 gap-2 text-white cursor-pointer'>
            {!!prices.FULL &&
                <div
                    onClick={() => handleSetCart(Quantity.FULL, item.prices.FULL)}
                    className='w-1/2 flex flex-col justify-center items-center gap-2 rounded-xl p-2 bg-green-light active:scale-105'
                >
                    <span>{Quantity.FULL}</span>
                    ₹{prices.FULL}
                </div>
            }

            <div className='w-1/2 h-full flex flex-col gap-2'>
                {!!prices.HALF &&
                    <div
                        onClick={() => handleSetCart(Quantity.HALF, item.prices.HALF)}
                        className={twMerge('w-full h-full flex justify-center items-center gap-2 rounded-xl p-2 bg-green-medium active:scale-105',
                            !prices.QUARTER ? 'flex-col' : '')}
                    >
                        {!!prices.QUARTER ? <span>H</span> : <span>{Quantity.HALF}</span>}
                        ₹{prices.HALF}
                    </div>}

                {!!prices.QUARTER &&
                    <div
                        onClick={() => handleSetCart(Quantity.QUARTER, item.prices.QUARTER)}
                        className='w-full h-full flex justify-center items-center gap-2 rounded-xl p-2 bg-green-dark active:scale-105'
                    >
                        <span>Q</span>
                        ₹{prices.QUARTER}
                    </div>}
            </div>
        </div>
    </Card>
}

export default ItemCard;