import { createFileRoute, redirect } from '@tanstack/react-router'
import { getAuthUser } from './auth/-auth-hooks';
import { Routes } from '@/models/routes';

export const Route = createFileRoute('/')({
  component: App,
  beforeLoad: () => {
    const authUser = getAuthUser();
    if(!authUser)
      throw redirect({to: `${Routes.AUTH}${Routes.LOGIN}`})
  },
})

function App() {
  return (
    <div className="text-center ">
      <div className='bg-green-light'>Green</div>
      <div className='bg-green-medium'>Green</div>
      <div className='bg-green-dark'>Green</div>
      <div className='bg-beige'>Green</div>
    </div>
  )
}
