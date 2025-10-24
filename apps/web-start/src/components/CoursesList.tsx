import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { useApiQuery, useCurrentUser } from '../integrations/api';
import type { CourseOut } from '@repo/api';

// THIS IS ESSENTIALY courses/index.tsx
type Course = {
  id: string
  title: string
  description: string
}

export const Route = createFileRoute('/data/courses/')({
  component: RouteComponent,
});

export default function RouteComponent() {
  const { data: user } = useCurrentUser();
  const query = useApiQuery<Array<CourseOut>>(['courses'], '/courses');

  const { data, refetch, error, showLoading } = query;

   if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (showLoading) return <div>Loading...</div>;

  if (!data || data.length === 0) {
    return <div>No courses found.</div>;
  }
  return (
    <ul>
      {data.map((course) => (
        <li key={course.id}>
          <strong>{course.title}</strong> — {course.description}
          <div> 
              <Link
                to="/data/courses/edit/$courseId"
                params={{ courseId: course.id }}
              >
                Edit Course 
              </Link>
              |
              <Link
                to="/data/courses/delete/$courseId"
                params={{ courseId: course.id }}
              >
                 Delete Course
              </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}