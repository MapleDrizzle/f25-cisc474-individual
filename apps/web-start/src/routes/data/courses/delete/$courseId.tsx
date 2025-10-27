import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useApiMutation } from '../../../../integrations/api';

export const Route = createFileRoute('/data/courses/delete/$courseId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { courseId } = useParams({ from: '/data/courses/delete/$courseId' });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useApiMutation<any, void>({
    endpoint: () => ({
      path: `/courses/${courseId}`,
      method: 'DELETE',
    }),
    invalidateKeys: [['courses']],
  });

  const handleDelete = () => {
    mutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['courses'] });
        navigate({ to: '/data/courses' });
      },
    });
  };

  return (
    <div>
      <h1>Delete Course</h1>
      <p>Are you sure you want to delete this course?</p>

      <button onClick={handleDelete} disabled={mutation.isPending}>
        {mutation.isPending ? 'Deleting...' : 'Yes, Delete'}
      </button>
      <button onClick={() => navigate({ to: '/data/courses' })}>Cancel</button>

      <hr />
      <div>
        <a href="/data/courses/">Back to Courses</a>
      </div>

      {mutation.isError && <p>❌ Error deleting course: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>✅ Course deleted!</p>}
    </div>
  );
}
