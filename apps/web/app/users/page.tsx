import { Suspense } from 'react';

async function getUsers() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

async function UsersList() {
  const users = await getUsers();
  return (
    <ul>
      {users.map((user: any) => (
        <li key={user.id}>
          <strong>{user.name}</strong> — {user.role}
        </li>
      ))}
    </ul>
  );
}

export default function UsersPage() {
    return (
        <div>
            <h1>Users</h1>
            <Suspense fallback={<p>Loading users...</p>}>
            <UsersList />
            </Suspense>
        </div>
    )
}
