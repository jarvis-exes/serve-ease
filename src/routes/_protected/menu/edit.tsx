import Card from '@/components/common/Card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/menu/edit')({
  component: EditMenu,
})

function EditMenu() {
  return <div className='flex h-full gap-5 p-5'>
    <Card classes='w-full p-5 flex-2'>
        Categorie
        
    </Card>

    <Card classes='w-full p-5 flex-3'> Items</Card>
  </div>
}

