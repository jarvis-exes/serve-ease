import Button from '@/components/common/Button';
import Card from '@/components/common/Card'
import type { Quantity } from '@/models/menu.enum';
import type { CartItem } from '@/models/menu.model'
import { OrderType } from '@/models/order.enum';
import { useState, type Dispatch, type FC, type SetStateAction } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { GiForkKnifeSpoon } from "react-icons/gi";
import { useCreateOrder } from '../-query-hooks';
import { getOutletId } from '@/utils/tokens';

type CartPannelProps = {
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>
}

const orderConfigs = [
  { type: OrderType.TABLE, color: 'bg-blue-500' },
  { type: OrderType.PARCEL, color: 'bg-green-500' },
  { type: OrderType.ZOMATO, color: 'bg-red-500' },
  { type: OrderType.SWIGGY, color: 'bg-orange-500' },
];

const CartPannel: FC<CartPannelProps> = ({ cart, setCart }) => {

  const [orderType, setOrderType] = useState<OrderType>(OrderType.TABLE);

  const { mutateAsync: createOrder } = useCreateOrder();
  const outletId = getOutletId();

  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleQuantityChange = (itemId: string, size: Quantity, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.itemId === itemId && item.size === size) {
          return { ...item, quantity: item.quantity + delta }
        }
        return item;
      }).filter(item => item.quantity > 0)
    })
  }

  const handleCreateOrder = () => {
    createOrder({
      outletId: outletId,
      orderType: orderType,
      orderItems: cart
    })
  }

  return (
    <Card className="flex-5 p-0 h-full flex flex-col ">
      <div className="bg-green-light px-7 py-2 rounded-t-2xl text-xl font-bold">
        Cart
      </div>

      <div className='p-3 h-full flex-1 flex flex-col gap-3 overflow-hidden'>
        <div className='flex gap-2 w-full text-center text-white font-semibold cursor-pointer'>
          {orderConfigs.map(({ type, color }) => (
            <span
              key={type}
              className={`${color} p-2 rounded-xl transition-all min-w-fit opacity-60 ${orderType === type ? 'flex-1 opacity-100' : ''
                }`}
              onClick={() => setOrderType(type)}
            >
              {type}
            </span>
          ))}
        </div>

        <Card className='bg-slate-100 h-full p-2 flex flex-col gap-1 overflow-auto'>
          {cart.length > 0 ? cart.map(item =>
            <div key={`${item.itemId}${item.size}`} className='flex justify-between items-center hover:bg-white rounded-xl p-2'>
              <div>
                <div className='flex gap-3 items-center'>
                  <div className='font-semibold'>{item.name}</div>
                  <div className='font- text-gray-700 bg-gray-200 px-2 rounded-md text-sm'>{item.size}</div>
                </div>
                <div className=''>{`${item.price} x ${item.quantity} = ₹${item.price * item.quantity}`}</div>
              </div>


              <div className='flex gap-3 h-fit min-w-24 items-center justify-center border-2 rounded-xl p-2 border-gray-300 shadow-md'>
                <FaMinus className='text-green-400 w-4 h-4 hover:text-red-500 active:scale-110'
                  onClick={() => handleQuantityChange(item.itemId, item.size, -1)}
                />
                <div className='font-semibold text-xl'>{item.quantity}</div>
                <FaPlus className='text-green-400 w-4 h-4 hover:text-green-600 active:scale-110'
                  onClick={() => handleQuantityChange(item.itemId, item.size, 1)}
                />
              </div>

            </div>
          ) :
            <div className='h-full flex flex-col gap-5 items-center justify-center'>
              <GiForkKnifeSpoon className='w-32 h-32 text-slate-800' />
              <span className='font-semibold text-slate-800'>Please Select Items</span>
            </div>
          }
        </Card>
        <div className='flex justify-between items-center px-2'>
          <span className='font-semibold text-xl'>Total: {totalPrice}</span>
          <Button color='green' className='px-8' disabled={cart.length < 1}
            onClick={handleCreateOrder}
          >
            Order
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default CartPannel