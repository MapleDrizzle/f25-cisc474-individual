import link from "next/Link"

export default function StudentDashboard() { 
  const courses = [
    {id: "CISC320", name: "Introduction to Algorithms"},
    {id: "CISC474", name: "Advanced Web Technologies"
    
  return ( 
    <div> 
    <h1>Student Dashboard</h1>
    <h2>Courses</h2>
      <ul> 
        {courses.map((course) => (
          <li key = {course.id}>
             <Link href={`/student/courses/${course.id}`}>{course.name}</Link>
          </li>
      ))}
      </ul> 
    </div> 
  );
}
