import Card from '@/components/common/Card'
import type { ItemType } from '@/models/menu.model'
import type { FC } from 'react';

type ItemsPannelProps = {
    items?: ItemType[];
}
const ItemsPannel:FC<ItemsPannelProps> = ({items}) => {
  return (
     <Card className="flex-4 p-0">
      <div className="h-full flex flex-col">
        <div className="bg-green-light px-7 py-2 rounded-t-2xl text-xl font-bold">
          Items
        </div>

       <div>
        {items?.map(item=>
            <div>{item.name}</div>
        )}
       </div>
      </div>
    </Card>
  )
}

export default ItemsPannel