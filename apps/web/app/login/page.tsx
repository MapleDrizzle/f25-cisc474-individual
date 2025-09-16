
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="max-w-sm mx-auto">
      <div className="text-center">
        <div className="text-4x1">🍞</div>
           <h1>Welcome! Login please:</h1>
        </div>
      <input type="text" placeholder="Username" className="w-full border rounded p-2" />
      <input type="password" placeholder="Password" className="w-full border rounded p-2" />
      <ul>
        <li><Link href="/student">Student Dashboard</Link></li>
        <li><Link href="/instructor">Instructor Dashboard</Link></li>
        <li><Link href="/administrator">Administrator Dashboard</Link></li>
      </ul>
    </div>
  );
}
