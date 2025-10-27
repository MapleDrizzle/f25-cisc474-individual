import { Link, createFileRoute } from '@tanstack/react-router'
import BackButton from "../../../components/BackButton"
import CoursesList from "../../../components/CoursesList";

export const Route = createFileRoute('/data/courses/')({
  component: Courses,
})

function Courses() {
  return (
    <div>
      <h1>Courses Page</h1>
        <CoursesList />
        <Link to="/data/courses/create" className="button-submit">Create New Course</Link>
    </div>
  );
}