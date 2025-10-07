import { Suspense } from "react";
import UsersList from "./UsersList";

export default function UsersPage() {
  return (
    <div>
      <h1>Users</h1>
      <Suspense fallback={<p>Loading users...</p>}>
        <UsersList />
      </Suspense>
    </div>
  );
}