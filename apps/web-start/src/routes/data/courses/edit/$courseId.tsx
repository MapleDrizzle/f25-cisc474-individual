import { createFileRoute, useParams } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useApiMutation, useCurrentUser } from '../../../../integrations/api';
import { backendFetcher } from '../../../../integrations/fetcher';
import type { CourseOut, CourseUpdateIn } from '@repo/api';

export const Route = createFileRoute('/data/courses/edit/$courseId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { courseId } = useParams({ from: '/data/courses/edit/$courseId' });
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: backendFetcher<CourseOut>(`/courses/${courseId}`),
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const mutation = useApiMutation<CourseUpdateIn, CourseOut>({
    endpoint: (variables) => ({
      path: `/courses/${courseId}`,
      method: 'PATCH',
    }),
    invalidateKeys: [['courses']],
  });

  if (isLoading) return <p>Loading course...</p>;
  if (!course) return <p>Course not found</p>;

  const handleSave = () => {
    mutation.mutate({
      title: title || course.title,
      description: description || course.description || '',
      ownerId: currentUser?.id ?? course.ownerId,
    });
  };

  return (
    <div>
      <h1>Edit Course: {course.title}</h1>

      <input
        type="text"
        placeholder="Course title"
        value={title || course.title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Course description"
        value={description || course.description || ''}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleSave} disabled={mutation.isPending}>
        {mutation.isPending ? 'Saving...' : 'Save Changes'}
      </button>

      <hr />
      <div>
        <a href="/data/courses/">Back to Courses</a>
      </div>

      {mutation.isSuccess && <p>✅ Course updated!</p>}
      {mutation.isError && <p>❌ Error updating course: {mutation.error.message}</p>}
    </div>
  );
}
