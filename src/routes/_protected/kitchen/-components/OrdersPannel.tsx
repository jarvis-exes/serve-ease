import Card from "@/components/common/Card";
import { twMerge } from "tailwind-merge";
import { OrderCard } from "./OrderCard";
import { IoFastFoodSharp } from "react-icons/io5";
import type { Order } from "@/models";

interface OrdersPannelProps {
    title: string;
    count: number;
    orders: Order[];
    accentColor: 'orange' | 'green';
    buttonLabel: string;
    onAction: (id: string) => void;
    showButton: boolean;
}

export const OrdersPannel = ({ title, count, orders, accentColor, buttonLabel, onAction, showButton }: OrdersPannelProps) => {
    const textClass = accentColor === 'orange' ? 'text-orange' : 'text-green';
    const bgClass = accentColor === 'orange' ? 'bg-orange' : 'bg-green';
    const borderClass = accentColor === 'orange' ? 'border-orange' : 'border-green';
    const btnHoverClass = accentColor === 'orange' ? 'hover:bg-orange/70' : 'hover:bg-green/70';

    return (
        <div className='h-full w-full flex flex-col overflow-auto'>
            <div className='flex text-lg px-6 py-3 items-center justify-between gap-2 '>
                <div className='flex items-center gap-2'>
                    <div className={twMerge('w-5 h-5 rounded-full', bgClass)}></div>
                    <span className='font-bold'>{title}</span>
                </div>
                <div className={twMerge('font-bold', textClass)}>{count} ORDERS</div>
            </div>
            <Card className='h-full p-3 overflow-auto m-2 mt-0'>
                {orders.length > 0 ? (
                    <div className="max-h-full overflow-auto gap-3 flex flex-wrap content-start">
                        {
                            orders.map(order => (
                                <OrderCard
                                    key={order._id}
                                    order={order}
                                    borderColor={borderClass}
                                    buttonColor={twMerge(bgClass, btnHoverClass)}
                                    buttonLabel={buttonLabel}
                                    onAction={onAction}
                                    showButton={showButton}
                                />
                            ))
                        }
                    </div>
                ) : (
                    <div className='w-full h-full flex items-center justify-center'>
                        <IoFastFoodSharp className='w-32 h-32 text-slate-800' />
                    </div>
                )}
            </Card>
        </div>
    );
};
