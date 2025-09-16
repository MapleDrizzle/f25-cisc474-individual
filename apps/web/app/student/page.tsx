import Link from "next/link"
import FooterNav from "../../components/FooterNav"

export default function Student() { 
  const courses = [
    {id: "CISC320", name: "Introduction to Algorithms"},
    {id: "CISC474", name: "Advanced Web Technologies"}
    ]
    
  return ( 
    <div className="min-h-screen flex flex-col items-center p-6"> 
      <h1>Student Dashboard</h1>

      <div className="w-full max-w-md">
        {courses.map(course => (
            <Link
              key={course.id}
              href={`/course/${course.id}`}
              className="panel"
            >
              {course.name}
            </Link>
          ))}
        </div>
        <div className="footer mt-auto w-full">
        <FooterNav />
        </div>
    </div> 
  )
}

