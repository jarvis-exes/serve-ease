import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Loader from '@/components/loaders/Loader'
import type { Order } from '@/models/menu.model'
import { OrderStatus, OrderType } from '@/enums/order.enum'
import { Roles } from '@/enums/roles.enum'
import { socket } from '@/socket'
import { getUser } from '@/utils/tokens'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { IoBag, IoFastFoodSharp } from "react-icons/io5";
import { ImSpoonKnife } from "react-icons/im";
import { sizeColors } from '../-constants'

function KitchenPage() {
    const user = getUser();
    const isKitchen = user?.role === Roles.KITCHEN;

    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        socket.emit("sync_orders", {})

        socket.on("orders_synced", (orders: Order[]) => {
            setOrders(orders);
        });

        socket.on("get_ready_order", (order: Order) => {
            setOrders((prev) =>
                prev.map((o) =>
                    o._id === order._id ? order : o
                ));
        });

        socket.on("order_completed", (order: Order) => {
            setOrders((prev) =>
                prev.filter((o) =>
                    o._id !== order._id
                ));
        });

        socket.on("new_order", (order: Order) => {
            setOrders((prev) => [...prev, order]);
            toast.info(`New Order #${order.tokenNumber}`);
            new Audio('./notification.wav').play();
        });

        return () => {
            socket.off("new_order");
            socket.off("orders_synced");
            socket.off("get_ready_order");
            socket.off("order_completed");
        };
    }, []);

    const handleOrderReady = (orderId: string) => {
        socket.emit("mark_order_ready", {
            "orderId": orderId
        })
    }

    const handleOrderComplete = (orderId: string) => {
        socket.emit("mark_order_complete", {
            "orderId": orderId
        })
    }

    const preparingOrders = orders.filter(order => order.status === OrderStatus.PREPARE);
    const preparedOrders = orders.filter(order => order.status === OrderStatus.READY);

    const orderTypeVarients = {
        [OrderType.PARCEL]: {
            color: 'bg-green',
            label: OrderType.PARCEL,
            icon: <IoBag/>
        },
        [OrderType.TABLE]: {
            color: 'bg-blue-500',
            label: OrderType.TABLE,
            icon: <ImSpoonKnife />
        },
        [OrderType.SWIGGY]: {
            color: 'bg-orange',
            label: OrderType.SWIGGY,
            icon: null
        },
        [OrderType.ZOMATO]: {
            color: 'bg-red-500',
            label: OrderType.ZOMATO,
            icon: null
        }
    }

    const OrderTypeChip = (type: OrderType) => {
        const orderChip = orderTypeVarients[type];
        
        return <div className={twMerge('flex gap-2 items-center rounded-md py-1 px-2 text-white', orderChip.color)}>
            {orderChip.icon}
            <span>{orderChip.label}</span>
        </div>
    }

    return (
        orders.length < 1 ?
            <div className='h-full w-full flex justify-center items-center'>
                <Loader type='pizza' classes='scale-200'/>
            </div>
            : <div className='h-full p-2 flex gap-3 text-gray-800'>
                <div className='h-full w-1/2 flex flex-col'>
                    <div className='flex text-lg px-6 py-3 items-center justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                            <div className='w-5 h-5 rounded-full bg-orange'> </div>
                            <span className='font-bold'>PREPARING</span>
                        </div>

                        <div className='text-orange font-bold'>{preparingOrders.length} ORDERS</div>
                    </div>
                    <Card className='max-h-full overflow-auto p-3 gap-3 flex flex-wrap'>
                        {preparingOrders.length > 0 
                        ? preparingOrders.map(order =>
                            <div key={order._id} className='grow shrink-0 flex flex-col justify-between min-w-fit border-2 border-orange rounded-xl p-3 text-nowrap'>
                                <div>
                                    <div className="font-bold flex gap-2 justify-between items-center border-b-2 border-gray-300 pb-3">
                                        <span className='text-xl'>Order #{order.tokenNumber}</span>
                                        {OrderTypeChip(order.orderType)}
                                    </div>

                                    <div className='flex flex-col gap-1 py-3'>
                                        {order.orderItems?.map(item =>
                                            <div key={`${item.itemId}${item.size}`} className='flex gap-2 justify-between items-center font-semibold'>
                                                <div className='flex gap-2 items-center'>
                                                    <span>{item.name}</span>
                                                    <span className={twMerge('px-1.5 rounded-sm text-sm', sizeColors[item.size])}>{item.size}</span>
                                                </div>
                                                <span>x {item.quantity}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                               
                                    <div className='flex justify-between items-center gap-3 pt-3 border-t-2 border-gray-300'>
                                        <span className='text-lg font-semibold text-gray-700'>Total: ₹{order.totalAmount}</span>
                                         {isKitchen &&
                                        <Button className='w-1/2 rounded-xl bg-orange text-white hover:bg-orange/70'
                                            onClick={() => handleOrderReady(order._id)}
                                        >
                                            Ready
                                        </Button>
}
                                    </div>
                            </div>
                        ) : 
                        <div className='h-96 w-full flex items-center justify-center'>
                            <IoFastFoodSharp className='w-32 h-32 text-slate-800'/>
                        </div>
                    }
                    </Card>
                </div>

                <div className='h-full w-1/2 flex flex-col'>
                    <div className='flex text-lg px-6 py-3 items-center justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                            <div className='w-5 h-5 rounded-full bg-green'> </div>
                            <span className='font-bold'>PREPARED</span>
                        </div>

                        <div className='text-green font-bold'>{preparedOrders.length} ORDERS</div>
                    </div>
                    <Card className='max-h-full overflow-auto p-3 gap-3 flex flex-wrap'>
                        {preparedOrders.length > 0 
                        ? preparedOrders.map(order =>
                            <div key={order._id} className='grow shrink-0 flex flex-col justify-between min-w-fit border-2 border-green rounded-xl p-3 text-nowrap'>
                                <div>
                                    <div className="font-bold flex gap-2 justify-between items-center border-b-2 border-gray-300 pb-3">
                                        <span className='text-xl'>Order #{order.tokenNumber}</span>
                                        {OrderTypeChip(order.orderType)}
                                    </div>

                                    <div className='flex flex-col gap-1 py-3'>
                                        {order.orderItems?.map(item =>
                                            <div key={`${item.itemId}${item.size}`} className='flex gap-2 justify-between items-center font-semibold'>
                                                <div className='flex gap-2 items-center'>
                                                    <span>{item.name}</span>
                                                    <span className={twMerge('px-1.5 rounded-sm text-sm', sizeColors[item.size])}>{item.size}</span>
                                                </div>
                                                <span>x {item.quantity}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                    <div className='flex justify-between items-center gap-3 pt-3 border-t-2 border-gray-300'>
                                        <span className='text-lg font-semibold text-gray-700'>Total: ₹{order.totalAmount}</span>
                                        {!isKitchen &&
                                        <Button className='w-1/2 rounded-xl bg-green text-white hover:bg-green/70'
                                            onClick={() => handleOrderComplete(order._id)}
                                        >
                                            Complete
                                        </Button>
                                        }
                                    </div>
                                
                            </div>
                        ) : 
                        <div className='h-96 w-full flex items-center justify-center'>
                            <IoFastFoodSharp className='w-32 h-32 text-slate-800'/>
                        </div>
                    }
                    </Card>
                </div>
            </div>)
}

export const Route = createFileRoute('/_protected/kitchen/')({
    component: KitchenPage,
})