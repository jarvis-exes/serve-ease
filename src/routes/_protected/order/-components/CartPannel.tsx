import Card from '@/components/common/Card'
import type { CartItem } from '@/models/menu.model'
import type { FC } from 'react';

type CartPannelProps = {
  cart: CartItem[];
}
const CartPannel: FC<CartPannelProps> = ({ cart }) => {
  return (
    <Card className="flex-5 p-0 h-full flex flex-col">
      <div className="bg-green-light px-7 py-2 rounded-t-2xl text-xl font-bold">
        Cart
      </div>

      <div>
        <div>
          Order Type
        </div>
        <div>
          {cart.map(item =>
            <div>
              <div>{item.name}</div>
              <div>{item.size}</div>
              <div>{item.quantity}</div>
            </div>

          )}
        </div>
      </div>
    </Card>
  )
}

export default CartPannel