import Link from "next/link" 
import FooterNav from "../../../components/FooterNav"

export default async function Course({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  const assignments = [
    { id: "1", title: "Assignment 1" },
    { id: "2", title: "Assignment 2" }
  ]

  return (
  <div className="min-h-screen bg-amber-800 flex flex-col items-center p-6">
    <h1 className="text-2xl font-bold text-white mb-6"> Course: {courseId} </h1>
    <p> Welcome to {courseId}. Here you'll find things such as the description and assignments.</p>
    
    <div className="w-full max-w-md space-y-4">
        {assignments.map(a => (
          <Link
            key={a.id}
            href={`/course/${courseId}/assignment/${a.id}`}
            className="panel block bg-amber-100 rounded-xl p-6 text-center text-lg font-medium shadow hover:bg-amber-200 transition"
          >
            {a.title}
          </Link>
        ))}
    </div>
      <div className="footer mt-auto w-full">
          <FooterNav />
      </div>
  </div>
  )
}
