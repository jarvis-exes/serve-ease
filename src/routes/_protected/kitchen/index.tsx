import type { Order } from '@/models/menu.model'
import { OrderStatus } from '@/enums/order.enum'
import { socket } from '@/socket'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useIsKitchen } from '@/utils/utils'
import { OrdersPannel } from './-components/OrdersPannel'
import SegmentedControl from '@/components/common/SegmentedControl'
import { useIsMobile } from '@/utils/mobile'


function KitchenPage() {
    const tabs = ['PREPARING', 'PREPARED'];

    const { tab } = Route.useSearch();
    const navigate = useNavigate({ from: Route.fullPath });
    const isKitchen = useIsKitchen();
    const isMobile = useIsMobile();

    const [orders, setOrders] = useState<Order[]>([]);

    const handleTabChange = (newTab: string) => {
        navigate({
            search: (prev) => ({ ...prev, tab: newTab }),
            replace: true
        })
    }

    useEffect(() => {
        socket.emit("sync_orders", {});
        socket.on("orders_synced", (orders: Order[]) => setOrders(orders));
        socket.on("get_ready_order", (order: Order) => {
            setOrders((prev) => prev.map((o) => (o._id === order._id ? order : o)));
        });
        socket.on("order_completed", (order: Order) => {
            setOrders((prev) => prev.filter((o) => o._id !== order._id));
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

    useEffect(() => {
        if (!isMobile) {
            navigate({
                search: (prev) => ({ ...prev, tab: 'ALL' }),
                replace: true
            })
        }
    },[tab])

    const handleOrderReady = (orderId: string) => socket.emit("mark_order_ready", { orderId });
    const handleOrderComplete = (orderId: string) => socket.emit("mark_order_complete", { orderId });

    const preparingOrders = orders.filter(o => o.status === OrderStatus.PREPARE);
    const preparedOrders = orders.filter(o => o.status === OrderStatus.READY);

    return (
        <div className='h-full flex flex-col p-2'>
            {isMobile &&
                <div className='w-full flex justify-center'>
                    <SegmentedControl
                        options={tabs}
                        defaultOption={tab as string}
                        onChange={handleTabChange}
                    />
                </div>
            }

            <div className='h-full overflow-auto flex gap-3 text-gray-800'>

                {(tab === 'PREPARING' || tab === 'ALL') && (
                    <OrdersPannel
                        title="PREPARING"
                        count={preparingOrders.length}
                        orders={preparingOrders}
                        accentColor="orange"
                        buttonLabel="Ready"
                        onAction={handleOrderReady}
                        showButton={isKitchen}
                    />
                )}

                {(tab === 'PREPARED' || tab === 'ALL') && (
                    <OrdersPannel
                        title="PREPARED"
                        count={preparedOrders.length}
                        orders={preparedOrders}
                        accentColor="green"
                        buttonLabel="Complete"
                        onAction={handleOrderComplete}
                        showButton={!isKitchen}
                    />
                )}

            </div>
        </div>

    );
}

export const Route = createFileRoute('/_protected/kitchen/')({
    validateSearch: (search) => {
        return {
            tab: (search.tab) || 'PREPARING'
        }
    },
    component: KitchenPage,
})