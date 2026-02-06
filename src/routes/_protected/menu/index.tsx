import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/menu/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='h-full'>Hello "/_protected/menu/"!</div>
}
