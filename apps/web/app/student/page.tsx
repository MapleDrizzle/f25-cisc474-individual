import Link from "next/link"
import FooterNav from "../../components/FooterNav"

export default function Student() { 
  const courses = [
    {id: "CISC320", name: "Introduction to Algorithms"},
    {id: "CISC474", name: "Advanced Web Technologies"}
    ]
    
  return ( 
    <div className="min-h-screen bg-amber-800 flex flex-col items-center p-6"> 
      <h1 className="text-4xl font-bold text-white mb-6">Student Dashboard</h1>
      <div className="w-full max-w-md space-y-4">
        {courses.map(course => (
            <Link
              key={course.id}
              href={`/course/${course.id}`}
              className="block bg-amber-100 rounded-xl p-6 text-center text-lg font-medium shadow hover:bg-amber-200 transition"
            >
              {course.name}
            </Link>
          ))}
        </div>
        <FooterNav />
    </div> 
  )
}

