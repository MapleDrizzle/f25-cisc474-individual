import { createFileRoute } from '@tanstack/react-router'
import UsersList from '../../../components/UsersList'

export const Route = createFileRoute('/data/users/')({
  component: Users,
})

function Users() {
  return (
    <div>
      <h1>Users</h1>
      <UsersList />
    </div>
  );
}