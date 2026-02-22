import { socket } from '@/socket'
import { getOutletId } from '@/utils/tokens';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useGetMenu } from './-query-hooks';



const OrderPage = () => {
  const outletId = getOutletId();
  const { data: menuItems } = useGetMenu(outletId);

  console.log(menuItems)

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {

    })

    return () => {
      socket.disconnect();
    }
  })

  return (
    <div>
      <h1>ORDER PAGE</h1>
      {menuItems.categories.map(category=>category.subCategories.map(subCategory=>subCategory.items.map(item=><div>{item.name}</div>)))}
    </div>

  )

}

export const Route = createFileRoute('/_protected/order/')({
  component: OrderPage,
})