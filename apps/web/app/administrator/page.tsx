import Link from "next/link"

export default function Administrator() {
  return (
    <div>
      <h1>Administrator Dashboard</h1>
      <p>Manage course settings, user permissions, and system activity.</p>
      <Link href="/login">Logout</Link>
    </div>
    );
}
