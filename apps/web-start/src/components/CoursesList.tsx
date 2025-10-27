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
    <ul className="space-y-4">
      {data.map((course) => (
        <li key={course.id}>
          <Link
              to="/data/courses/$courseId"
              params={{ courseId: course.id }}
              className="panel block"
            >
              {course.title} - {course.code}
            </Link>
          <div className="mt-2 flex gap-2 text-sm"> 
              <Link
                to="/data/courses/edit/$courseId"
                params={{ courseId: course.id }}
                className="text-blue-600 hover:underline"
              >
                Edit Course 
              </Link>
              |
              <Link
                to="/data/courses/delete/$courseId"
                params={{ courseId: course.id }}
                className="text-red-600 hover:underline"
              >
                 Delete Course
              </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}