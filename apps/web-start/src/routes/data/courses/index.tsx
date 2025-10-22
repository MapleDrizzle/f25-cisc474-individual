import { Link, createFileRoute } from '@tanstack/react-router'
import CoursesList from "../../../components/CoursesList";

export const Route = createFileRoute('/data/courses/')({
  component: Courses,
})

function Courses() {
  return (
    <div>
      <h1>Courses</h1>
        <CoursesList />
        <Link to="/data/courses/create">Create New Course</Link>
    </div>
  );
}