import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Login,
});

function Login() {
  return (
    <div className="max-w-sm mx-auto">
      <div className="text-center">
        <div className="text-4x1">🍞</div>
           <h1>Welcome! Login please:</h1>
        </div>
      <input type="text" placeholder="Username" className="w-full border rounded p-2" />
      <input type="password" placeholder="Password" className="w-full border rounded p-2" />
      <ul className="w-full space-y-2 text-center">
        <li>
          <Link to="/student">
            Student Dashboard
          </Link>
        </li>
        <li>
          <Link to="/instructor">
            Instructor Dashboard
          </Link>
        </li>
        <li>
          <Link to="/administrator">
            Administrator Dashboard
          </Link>
        </li>
        <li>
          <Link to="/data">
            VIEW FRONTEND/BACKEND DATA
          </Link>
        </li>
      </ul>
    </div>
  );
}

