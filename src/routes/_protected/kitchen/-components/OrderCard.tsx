import { twMerge } from "tailwind-merge";
import { OrderTypeChip } from "./OrderTypeChip";
import { sizeColors } from "../../-constants";
import type { Order } from "@/models";
import Button from "@/components/common/Button";

interface OrderCardProps {
    order: Order;
    borderColor: string;
    buttonColor: string;
    buttonLabel: string;
    onAction: (id: string) => void;
    showButton: boolean;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, borderColor, buttonColor, buttonLabel, onAction, showButton }) => (
    <div className={twMerge('grow shrink-0 flex flex-col justify-between min-w-fit border-2 rounded-xl p-3 text-nowrap', borderColor)}>
        <div>
            <div className="font-bold flex gap-2 justify-between items-center border-b-2 border-gray-300 pb-3">
                <span className='text-xl'>Order #{order.tokenNumber}</span>
                <OrderTypeChip type={order.orderType} />
            </div>

            <div className='flex flex-col gap-1 py-3'>
                {order.orderItems?.map(item => (
                    <div key={`${item.itemId}${item.size}`} className='flex gap-2 justify-between items-center font-semibold'>
                        <div className='flex gap-2 items-center'>
                            <span>{item.name}</span>
                            <span className={twMerge('px-1.5 rounded-sm text-sm', sizeColors[item.size])}>{item.size}</span>
                        </div>
                        <span>x {item.quantity}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className='flex justify-between items-center gap-3 pt-3 border-t-2 border-gray-300'>
            <span className='text-lg font-semibold text-gray-700'>Total: ₹{order.totalAmount}</span>
            {showButton && (
                <Button
                    className={twMerge('w-1/2 rounded-xl text-white', buttonColor)}
                    onClick={() => onAction(order._id)}
                >
                    {buttonLabel}
                </Button>
            )}
        </div>
    </div>
);