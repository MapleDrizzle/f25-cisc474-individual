import { useEffect, useState } from 'react'
import { backendFetcher } from '../integrations/fetcher'

type User = {
  id: string
  name: string
  role: string
}

export default function UsersList() {
  const [users, setUsers] = useState<Array<User>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetchUsersFn = await backendFetcher<Array<User>>('/users')
        const data = await fetchUsersFn()
        setUsers(data)
      } catch (err: any) {
        console.error(err)
        setError(err.message || 'Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <strong>{user.name}</strong> — {user.role}
        </li>
      ))}
    </ul>
  );
}