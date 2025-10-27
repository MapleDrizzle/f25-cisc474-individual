import { Link, createFileRoute } from '@tanstack/react-router';
import LoginButton from '../components/LoginButton';

export const Route = createFileRoute('/')({
  component: Login,
});

function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[var(--background)] text-center">
      <div className="w-full max-w-sm bg-[var(--panel)] rounded-2xl p-6 shadow-lg">
           <h1>Welcome to Baking Sheet! 🍞</h1>
           <LoginButton />
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
      </ul>
      </div>
    </div>
  );
}

