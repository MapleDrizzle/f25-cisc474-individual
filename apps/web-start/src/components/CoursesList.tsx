import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { useApiQuery, useCurrentUser } from '../integrations/api';
import LoginButton from './LoginButton';
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
  const { data: user, isLoading: userLoading } = useCurrentUser();

  if (userLoading) return <div>Loading user...</div>; // SIR: ADDED THIS HELPFUL PAGE TO CHECK IF USER IS LOGGED IN
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-2xl font-bold mb-4">You're not logged in!</h1>
        <p className="mb-6">Please log in to view your courses.</p>
        <LoginButton /> 
      </div>
    );
  }
  const query = useApiQuery<Array<CourseOut>>(['courses'], '/courses' );

  const { data, error, showLoading } = query;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (showLoading) return <div>Loading courses...</div>;

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