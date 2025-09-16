import Link from "next/link"

export default function FooterNav() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-amber-200 border-t border-brown-700 flex justify-center space-x-6 py-2 rounded-t-xl">
      <Link href="/instructor" className="hover:underline">Instructor</Link>
      <span>|</span>
      <Link href="/administrator" className="hover:underline">Admin</Link>
    </div>
  )
}