import { createFileRoute } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useApiMutation, useCurrentUser } from '../../../integrations/api'; 
import type { CourseCreateIn, CourseOut } from '@repo/api';

export const Route = createFileRoute('/data/courses/create')({ // FORM TO CREATE COURSE
  component: RouteComponent,
});

function RouteComponent() {
  const { data: currentUser } = useCurrentUser();
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCourseCode, setCourseCode] = useState('');

  const queryClient = useQueryClient();

  const mutation = useApiMutation<CourseCreateIn, CourseOut>({
    endpoint: (variables) => ({
      path: '/courses',
      method: 'POST',
    }),
    invalidateKeys: [['courses']],
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
                  code: newCourseCode,
                  ownerId: currentUser?.id || '',}); // SIR: ADDED OWNERID WHEN UPDATING DATABASE SCHEMA
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