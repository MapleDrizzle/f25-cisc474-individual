import { createFileRoute, useParams } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { backendFetcher, mutateBackend } from '../../../../integrations/fetcher';
import type { CourseOut, CourseUpdateIn } from '@repo/api';

export const Route = createFileRoute('/data/courses/edit/$courseId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { courseId } = useParams({ from: '/data/courses/edit/$courseId' });
  const queryClient = useQueryClient();

  // Fetch existing course data
  const { data: course, isLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: backendFetcher<CourseOut>(`/courses/${courseId}`),
  });

  const [title, setName] = useState('');
  const [description, setDescription] = useState('');

  const mutation = useMutation({
    mutationFn: (updated: CourseUpdateIn) =>
      mutateBackend<CourseUpdateIn, CourseOut>(`/courses/${courseId}`, 'PATCH', updated), // SIR: ADDED THIS
    onSuccess: (data) => {
      queryClient.setQueryData(['course', courseId], data);
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  if (isLoading) return <p>Loading course...</p>;
  if (!course) return <p>Course not found</p>;

  return (
    <div>
      <h1>Edit Course: {course.title}</h1>
      <input
        type="text"
        placeholder="Course name"
        value={title || course.title}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Course description"
        value={description || course.description || ''}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={() =>
          mutation.mutate({
            title, description,
            ownerId: '' // SIR: ADDED THIS
          })
        }
      >
        Save Changes
      </button>
      <hr></hr>
      <div>
        <a href="/data/courses/">Back to Courses</a>
      </div>
      {mutation.isSuccess && <p>✅ Course updated!</p>}
      {mutation.isError && <p>❌ Failed to update course</p>}
    </div>
  );
}
