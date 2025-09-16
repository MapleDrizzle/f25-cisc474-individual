import Link from "next/link" 
import FooterNav from "../../../components/FooterNav"
import BackButton from "../../../components/BackButton"

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
  <div className="flex flex-col items-center p-6">
    <div className="flex-grow items-center space-y-6">
      <h1> Course: {courseId} </h1>
      <p> Welcome to {courseId}. Here you'll find things such as the description and assignments.</p>
      <div className="space">  
          {assignments.map(a => (
            <Link
              key={a.id}
              href={`/course/${courseId}/assignment/${a.id}`}
              className="panel"
            >
              {a.title}
            </Link>
            ))}
      </div>
      <BackButton />
    </div>
    <div className="footer mt-auto w-full">
        <FooterNav />
    </div>
  </div>
  
  )
}
