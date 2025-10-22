import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mutateBackend } from '../../../../integrations/fetcher';

export const Route = createFileRoute('/data/courses/delete/$courseId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { courseId } = useParams({ from: '/data/courses/delete/$courseId' });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => mutateBackend(`/courses/${courseId}`, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      navigate({ to: '/data/courses' });
    },
  });

  return (
    <div>
      <h1>Delete Course</h1>
      <p>Are you sure you want to delete this course?</p>
      <button onClick={() => mutation.mutate()}>Yes, Delete</button>
      <button onClick={() => navigate({ to: '/data/courses' })}>Cancel</button>
      <hr></hr>
      <div>
        <a href="/data/courses/">Back to Courses</a>
      </div>
      {mutation.isPending && <p>Deleting...</p>}
      {mutation.isError && <p>Error deleting course</p>}
    </div>
  );
}
