import Link from "next/link"
import FooterNav from "../../components/FooterNav"

export default function Instructor() {
  return (
    <div>
      <h1>Instructor Dashboard</h1>
      <p>Manage your courses, assignments, and students.</p>
      <div className="footer mt-auto w-full">
          <FooterNav />
      </div>
    </div>
    );
}
