import Link from "next/link"

export default function FooterNav() {
  return (
    <div className="footer">
      <Link href="/instructor" className="hover:underline">Instructor</Link>
      <span> | </span>
      <Link href="/administrator" className="hover:underline">Admin</Link>
      <span> | </span>
      <Link href="/student" className="hover:underline">Student</Link>
      <span> | </span>
      <Link href="/" className="hover:underline">Logout</Link>
    </div>
  )
}