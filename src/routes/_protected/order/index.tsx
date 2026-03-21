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

  // useEffect(() => {

  //   socket.on("new_order", (order) => {
  //       window.alert("New Order")
  //       console.log(order);
  //   //   setOrders((prev) => [...prev, order]);
  //   });

  //   // return () => {
  //   //   socket.off("new_order");
  //   // };

  // }, []);

  useEffect(() => {

    socket.on("new_order", (order) => {
      new Audio('./notification.wav').play();
      console.log("New order received:", order);
    });

    return () => {
      socket.off("new_order");
    };

  }, []);

  return (
    <div className='flex w-full h-full p-2 gap-2 bg-gray-100'>
      <CategoriesPannel selectItems={setItems} />
      <ItemsPannel items={items} setCart={setCart} />
      <CartPannel cart={cart} setCart={setCart} />
    </div>
  )
}

export const Route = createFileRoute('/_protected/order/')({
  component: OrderPage,
})