import Link from "next/link"
import FooterNav from "../../components/FooterNav"

export default function Instructor() {
  return (
    <div>
      <h1>Instructor Dashboard</h1>
      <p>Manage your courses, assignments, and students.</p>
      <Link href="/login">Logout</Link>
      <FooterNav />
    </div>
    );
}
