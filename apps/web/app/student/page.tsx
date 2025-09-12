import link from "next/Link"

export default function StudentDashboard() { 
  return ( 
    <div> 
    <h1>Student Dashboard</h1>
    <h2>Courses</h2>
      <ul> 
        {courses.map((course) => (
          <li key = {course.id}>
             <Link href={`/student/courses/${course.id}/assignment`}>{course.name}</Link>
          </li>
      ))}
      </ul> 
    </div> 
  );
}
