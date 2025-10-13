import { Link, createFileRoute } from '@tanstack/react-router'
import FooterNav from "../components/FooterNav"

export const Route = createFileRoute('/student')({
  component: Student,
})

function Student() { 
  const courses = [
    {id: "CISC320", name: "Introduction to Algorithms"},
    {id: "CISC474", name: "Advanced Web Technologies"}
    ]
    
  return ( 
    <div > 
      <h1>Student Dashboard</h1>

      <div>
        {courses.map(course => (
            <Link
              key={course.id}
              to="/course/$courseId"
              params={{ courseId: course.id }}
              className="panel"
            >
              {course.name}
            </Link>
          ))}
        </div>
        <div>
        <FooterNav />
        </div>
    </div> 
  )
}

