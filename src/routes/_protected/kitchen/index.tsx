import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Loader from '@/components/loaders/Loader'
import type { Order } from '@/models/menu.model'
import { Roles } from '@/models/roles.enum'
import { socket } from '@/socket'
import { getUser } from '@/utils/tokens'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge'

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
            setOrders((prev) => [order, ...prev]);
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

    const sizeColors = {
       FULL : 'bg-teal-100 text-teal-700',
       HALF : 'bg-cyan-100 text-cyan-700',
       QUARTER : 'bg-blue-100 text-blue-700'
    } 
    

    return (
        orders.length < 1 ?
            <div className='h-full w-full flex justify-center items-center'>
                <Loader type='pizza' classes='scale-200' />
            </div>
            : <div className='bg-gray-200 h-full p-2 flex text-gray-800'>
                <Card className='h-full w-1/2 flex flex-col p-0 pb-2'>
                    <div className='flex text-lg p-2 font-bold items-center gap-2'>
                        <div className='w-5 h-5 rounded-full bg-green-500'> </div>
                        <span>Preparing</span>
                    </div>
                    <div className='max-h-full overflow-auto p-2 pt-0 pb-9 gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
                        {orders?.filter(order => order.status !== 'READY').map(order =>
                            <Card key={order._id} className='flex flex-col w-full h-fit p-0'>
                                <div className="bg-linear-to-b from-gray-400 to-gray-300 px-2 py-2 rounded-t-2xl font-bold flex justify-between">
                                    <span>#{order.tokenNumber}</span>
                                    <span>{order.orderType}</span>
                                </div>
                                <div className='flex flex-col gap-1 p-2'>
                                    {order.orderItems?.map(item =>
                                        <div key={`${item.itemId}${item.size}`} className='flex gap-2 justify-between items-center font-semibold px-3'>
                                            <div className='flex gap-2 items-center'>
                                                <span>{item.name}</span>
                                                <span className={twMerge('px-1.5 rounded-sm text-sm', sizeColors[item.size])}>{item.size}</span>
                                            </div>
                                            <span>x {item.quantity}</span>
                                        </div>
                                    )}
                                </div>
                                <div className='p-2 flex justify-center'>
                                    {isKitchen &&
                                        <Button color='green' className='w-full rounded-xl'
                                            onClick={() => handleOrderReady(order._id)}
                                        >
                                            Ready
                                        </Button>
                                    }
                                </div>
                            </Card>
                        )}
                    </div>
                </Card>
                <div className='h-full w-1/2 flex flex-col pb-2'>
                    <div className='text-lg p-2 font-bold text-center'>Prepared</div>
                    <div className='max-h-full overflow-auto p-2 pt-0 pb-9 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
                        {orders?.filter(order => order.status === 'READY').map(order =>
                            <Card key={order._id} className='flex flex-col w-full h-fit p-0'>
                                <div className="bg-linear-to-b from-gray-400 to-gray-300 px-2 py-2 rounded-t-2xl font-bold flex justify-between">
                                    <span>#{order.tokenNumber}</span>
                                    <span>{order.orderType}</span>
                                </div>
                                <div className='flex flex-col p-2'>
                                    {order.orderItems?.map(item =>
                                        <div className='flex gap-2 justify-between items-center'>
                                            <div className='flex gap-2 items-center'>
                                                <span>{item.name}</span>
                                                <span className='px-1.5 rounded-xl text-sm text-green-dark font-semibold bg-gray-200'> {item.size}</span>
                                            </div>
                                            <span>x{item.quantity}</span>
                                        </div>
                                    )}

                                </div>
                                <div className='p-2 flex justify-center'>
                                    {!isKitchen &&
                                        <Button color='green' className='w-full rounded-xl'
                                            onClick={() => handleOrderComplete(order._id)}
                                        >
                                            Complete
                                        </Button>
                                    }
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>)
}

export const Route = createFileRoute('/_protected/kitchen/')({
    component: KitchenPage,
})