import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/data/')({
  component: Data,
})

function Data() {
  return (
    <main>
      <h1>Data Viewer</h1>
      <ul>
        <li><Link to="/data/users">View Users</Link></li>
        <li><Link to="/data/courses">View Courses</Link></li>
      </ul>
    </main>
  );
}
