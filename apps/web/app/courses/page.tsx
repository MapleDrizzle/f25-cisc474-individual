import { Suspense } from 'react';

async function getCourses() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch courses');
  return res.json();
}

async function CoursesList() {
  const courses = await getCourses();
  return (
    <ul>
      {courses.map((course: any) => (
        <li key={course.id}>
          <strong>{course.name}</strong> — {course.role}
        </li>
      ))}
    </ul>
  );
}

export default function CoursesPage() {
    return (
        <div>
            <h1>Courses</h1>
            <Suspense fallback={<p>Loading courses...</p>}>
            <CoursesList />
            </Suspense>
        </div>
    )
}
