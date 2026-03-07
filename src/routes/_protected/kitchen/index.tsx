import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import { socket } from '@/socket'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

function KitchenPage() {
    // useEffect(() => {
    //     console.log("first")
    //     socket.on('new_order', (data) => {
    //         new Audio('./notification.wav').play();
    //         console.log(data);
    //     })

    //     // return () => socket.disconnect();
    // },[])

    useEffect(() => {
      
    socket.on("new_order", (order) => {
        window.alert("New Order")
        console.log(order);
    //   setOrders((prev) => [...prev, order]);
    });

    return () => {
      socket.off("new_order");
    };

  }, []);
    

    return <div className='bg-gray-100 h-full p-2'>
        <Card className='flex flex-col w-fit p-0'>
            <div className="bg-green-light px-7 py-2 rounded-t-2xl font-bold">
                #1 PARCEL
            </div>
            <div className='flex flex-col p-2'>
                <span>Kadhai Panner x 1</span>
                <span>Jeera Rice x 1</span>
            </div>
            <div className='p-2 flex justify-center'>
                <Button color='green'>Prepared</Button>
            </div>

        </Card>
    </div>
}

export const Route = createFileRoute('/_protected/kitchen/')({
    component: KitchenPage,
})