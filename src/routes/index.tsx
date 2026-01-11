import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
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
