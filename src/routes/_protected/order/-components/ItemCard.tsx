import Card from "@/components/common/Card";
import { Quantity } from "@/enums/menu.enum";
import type { CartItem, ItemType } from "@/models/menu.model";
import type { Dispatch, FC, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import { sizeColors } from "../../-constants";
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { FaChevronDown } from "react-icons/fa";

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

        <div className='flex w-full h-12 gap-2 text-white cursor-pointer'>
            {!!prices.FULL &&
                <div
                    onClick={() => handleSetCart(Quantity.FULL, item.prices.FULL)}
                    className={twMerge('w-full flex flex-col justify-center items-center rounded-xl p-2 font-medium active:scale-105',
                        sizeColors.FULL,
                    )}
                >
                    <span>{Quantity.FULL}</span>
                    ₹{prices.FULL}
                </div>
            }

            <div className='w-full h-full flex flex-col gap-2'>

                {!!prices.QUARTER ?
                    <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                            <div className={twMerge('group w-full h-full flex justify-center items-center rounded-xl p-2 font-medium active:scale-105',
                                sizeColors.HALF)}
                            >
                                <FaChevronDown className="transition-transform shrink-0 duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180" />
                            </div>
                        </Dropdown.Trigger>

                        <Dropdown.Portal>
                            <Dropdown.Content
                                sideOffset={5} align="end"
                                /* 2. UPDATED CLASSES: Override trigger coordinates to stretch to the Card edges */
                                className="z-20 flex gap-2 bg-white p-2 rounded-xl shadow-lg border border-gray-100 data-[state='open']:animate-pop-in data-[state='closed']:animate-pop-out"
                            >
                                <Dropdown.Item
                                    onSelect={() => handleSetCart(Quantity.HALF, item.prices.HALF)}
                                    className={twMerge('w-full flex flex-col justify-center items-center rounded-xl p-2 font-medium active:scale-105 cursor-pointer',
                                        sizeColors.HALF,
                                    )}
                                >
                                    <span>{Quantity.HALF}</span>
                                    ₹{prices.HALF}
                                </Dropdown.Item>

                                <Dropdown.Item
                                    onSelect={() => handleSetCart(Quantity.QUARTER, item.prices.QUARTER)}
                                    className={twMerge('w-full flex flex-col justify-center items-center rounded-xl p-2 font-medium active:scale-105 cursor-pointer',
                                        sizeColors.QUARTER,
                                    )}
                                >
                                    <span>{Quantity.QUARTER}</span>
                                    ₹{prices.QUARTER}
                                </Dropdown.Item>
                            </Dropdown.Content>
                        </Dropdown.Portal>
                    </Dropdown.Root>
                    :
                    prices.HALF &&  <div
                        onClick={() => handleSetCart(Quantity.HALF, item.prices.HALF)}
                        className={twMerge('w-full h-full flex flex-col justify-center items-center rounded-xl p-2 font-medium active:scale-105',
                            sizeColors.HALF)}
                    >
                        <span>{Quantity.HALF}</span>
                        ₹{prices.HALF}
                    </div>
                }

            </div>
        </div>
    </Card>
}

export default ItemCard;