import { socket } from '@/socket'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { CartItem, ItemType, Order } from '@/models/menu.model';
import CategoriesPannel from './-components/CategoriesPannel';
import ItemsPannel from './-components/ItemsPannel';
import CartPannel from './-components/CartPannel';
import { toast, ToastContainer } from 'react-toastify';

const OrderPage = () => {
  const [items, setItems] = useState<ItemType[]>();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    socket.on("get_ready_order", (order:Order) => {
      new Audio('./notification.wav').play();
      toast.success(`Order Ready #${order.tokenNumber}`)
    });

    return () => {
      socket.off("get_ready_order");
    };
  }, []);

  return (
    <div className='flex w-full h-full p-2 gap-2 bg-gray-100'>
      <CategoriesPannel selectItems={setItems} />
      <ItemsPannel items={items} setCart={setCart} />
      <CartPannel cart={cart} setCart={setCart} />
      <ToastContainer/>
    </div>
  )
}

export const Route = createFileRoute('/_protected/order/')({
  component: OrderPage,
})