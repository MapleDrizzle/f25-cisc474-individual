import Link from "next/link"
import FooterNav from "../../components/FooterNav"

export default function Administrator() {
  return (
    <div>
      <h1>Administrator Dashboard</h1>
      <p>Manage course settings, user permissions, and system activity.</p>
      <div className="footer mt-auto w-full">
          <FooterNav />
      </div>
    </div>
    );
}
