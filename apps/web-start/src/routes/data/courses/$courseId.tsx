import { Link, createFileRoute } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { useApiQuery } from '../../../integrations/api';
import BackButton from "../../../components/BackButton"
import type { CourseOut } from '@repo/api';


export const Route = createFileRoute('/data/courses/$courseId')({
  component: RouteComponent,
})

function RouteComponent() {
  const courseId = Route.useParams().courseId;
  const {
    data: course,
    showLoading,
    error,
  } = useApiQuery<CourseOut>(['courses', courseId], `/courses/${courseId}`);

  if (showLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <header>
        <h1>{course.title}</h1>
      </header>
      Welcome to the course page for {course.title}!<br></br>
      <a href="/data/courses/">Back to Courses</a>
      <hr></hr>
      <div>Description: {course.description}</div>
      <div>Owner ID: {course.ownerId}</div>
      <div>Course ID: {course.id}</div>
      <div><BackButton /></div>
    </div>
  );
}
