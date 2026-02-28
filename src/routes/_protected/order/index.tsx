import { socket } from '@/socket'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { CartItem, ItemType } from '@/models/menu.model';
import CategoriesPannel from './-components/CategoriesPannel';
import ItemsPannel from './-components/ItemsPannel';
import CartPannel from './-components/CartPannel';

const OrderPage = () => {
  const [items, setItems] = useState<ItemType[]>();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {

    })
    return () => {
      socket.disconnect();
    }
  }, [])

  return (
    <div className='flex w-full h-full p-2 gap-2 bg-gray-100'>
      <CategoriesPannel selectItems={setItems}/>
      <ItemsPannel items={items} setCart={setCart}/> 
      <CartPannel cart={cart}/> 
    </div>
  )
}

export const Route = createFileRoute('/_protected/order/')({
  component: OrderPage,
})