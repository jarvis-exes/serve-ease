import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import type { Order } from '@/models/menu.model'
import { socket } from '@/socket'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

function KitchenPage() {

    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {

        socket.on("new_order", (order: Order) => {
            new Audio('./notification.wav').play();
            setOrders((prev) => [...prev, order]);
        });

        return () => {
            socket.off("new_order");
        };

    }, []);


    return <div className='bg-gray-200 h-full p-2 flex'>
        <Card className='h-full w-1/2 flex flex-col p-0 pb-2'>
            <div className='text-lg p-2 font-bold text-center'>Preparing</div>
            <div className='max-h-full overflow-auto p-2 pt-0 pb-9 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {orders?.map(order =>
                <Card className='flex flex-col w-full h-fit p-0'>
                    <div className="bg-green-light text-gray-800 px-2 py-2 rounded-t-2xl font-bold flex justify-between">
                        <span>#{order.tokenNumber}</span>
                        <span>{order.orderType}</span>
                    </div>
                    <div className='flex flex-col p-2'>
                        {order.orderItems?.map(item =>
                            <div className='flex gap-2 justify-between items-center'>
                                <div className='flex gap-2 items-center'>
                                    <span>{item.name}</span>
                                    <span className=' text-green-dark font-semibold'>{item.size}</span>
                                </div>
                                <span>x{item.quantity}</span>
                            </div>
                        )}
                    </div>
                    <div className='p-2 flex justify-center'>
                        <Button color='green' className='w-full rounded-xl'>Ready</Button>
                    </div>
                </Card>
            )}
            </div>  
        </Card>
         <div className='h-full w-1/2 flex flex-col pb-2'>
           <div className='text-lg p-2 font-bold text-center'>Prepared</div>
           <div className='max-h-full overflow-auto p-2 pt-0 pb-9 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {orders?.map(order =>
                <Card className='flex flex-col w-full h-fit p-0'>
                    <div className="bg-green-light text-gray-800 px-2 py-2 rounded-t-2xl font-bold flex justify-between">
                        <span>#{order.tokenNumber}</span>
                        <span>{order.orderType}</span>
                    </div>
                    <div className='flex flex-col p-2'>
                        {order.orderItems?.map(item =>
                            <div className='flex gap-2 justify-between items-center'>
                                <div className='flex gap-2 items-center'>
                                    <span>{item.name}</span>
                                    <span className=' text-gray-500 font-semibold'> {item.size}</span>
                                </div>
                                <span>x{item.quantity}</span>
                            </div>
                        )}

                    </div>
                    <div className='p-2 flex justify-center'>
                        <Button color='green' className='w-full rounded-xl bg-green-dark'>Prepared</Button>
                    </div>

                </Card>
            )}
            </div> 
        </div>   

    </div>
}

export const Route = createFileRoute('/_protected/kitchen/')({
    component: KitchenPage,
})