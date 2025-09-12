import Link from "next/link"

export default function Student() { 
  const courses = [
    {id: "CISC320", name: "Introduction to Algorithms"},
    {id: "CISC474", name: "Advanced Web Technologies"}
    ]
    
  return ( 
    <div> 
    <h1>Student Dashboard</h1>
    <h2>Courses</h2>
      <ul> 
        {courses.map((course) => (
          <li key = {course.id}>
             <Link href={`/course/${course.id}`}>{course.name}</Link>
             <Link href="/login">Logout</Link>
          </li>
      ))}
      </ul> 
    </div> 
  )
}
