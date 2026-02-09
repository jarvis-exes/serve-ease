import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/order/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/dashboard/"!</div>
}
