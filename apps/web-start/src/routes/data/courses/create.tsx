import { createFileRoute } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { mutateBackend } from '../../../integrations/fetcher';
import type { CourseCreateIn, CourseOut } from '@repo/api';
// import { useApiMutation, useCurrentUser } from '../../integrations/api'; THIS WILL BE FOR AUTHENTICATION

export const Route = createFileRoute('/data/courses/create')({
  component: RouteComponent,
});

function RouteComponent() {
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCourseCode, setCourseCode] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newCourse: CourseCreateIn) => {
      return mutateBackend<CourseOut>('/courses', 'POST', newCourse);
    },
    onSuccess: (data: CourseOut) => {
      queryClient.setQueryData(['courses', data.id], data);
    },
  });

  return (
    <div>
      <header>
        <h1>Create a New Course</h1>
      </header>
      {mutation.isPending ? (
        <div>Creating course...</div>
      ) : (
        <>
          {mutation.isError ? (
            <div>Error creating course: {mutation.error.message}</div>
          ) : null}
          {mutation.isSuccess ? (
            <div>Course created successfully! ID: {mutation.data.id}</div>
          ) : null}
          <hr></hr>
          <div>
            <input
              type="text"
              placeholder="Course Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Course Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Course Code"
              value={newCourseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />
          </div>
          <div></div>
          <div>
            <button
              onClick={() => {
                mutation.mutate({
                  title: newName,
                  description: newDescription,
                  code: newCourseCode});
              }}
            >
              Create Course
            </button>
          </div>
          <hr></hr>
          <div>
            <a href="/data/courses/">Back to Courses</a>
          </div>
        </>
      )}
    </div>
  );
}