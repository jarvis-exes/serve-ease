import { OrderType } from "@/enums/order.enum";
import { ImSpoonKnife } from "react-icons/im";
import { IoBag } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export const OrderTypeChip = ({ type }: { type: OrderType }) => {
    const orderTypeVariants = {
        [OrderType.PARCEL]: { color: 'bg-green', label: OrderType.PARCEL, icon: <IoBag /> },
        [OrderType.TABLE]: { color: 'bg-blue-500', label: OrderType.TABLE, icon: <ImSpoonKnife /> },
        [OrderType.SWIGGY]: { color: 'bg-orange', label: OrderType.SWIGGY, icon: null },
        [OrderType.ZOMATO]: { color: 'bg-red-500', label: OrderType.ZOMATO, icon: null }
    };

    const variant = orderTypeVariants[type];
    return (
        <div className={twMerge('flex gap-2 items-center rounded-md py-1 px-2 text-white text-sm', variant.color)}>
            {variant.icon}
            <span>{variant.label}</span>
        </div>
    );
};