import { useEffect, useState } from 'react'
// import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { backendFetcher } from '../integrations/fetcher'
import { Link } from '@tanstack/react-router';

type Course = {
  id: string
  title: string
  description: string
}

export default function CoursesList() {
  const [courses, setCourses] = useState<Array<Course>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const fetchCoursesFn = await backendFetcher<Array<Course>>('/courses')
        const data = await fetchCoursesFn()
        setCourses(data)
      } catch (err: any) {
        console.error(err)
        setError(err.message || 'Failed to fetch courses')
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <ul>
      {courses.map((course) => (
        <li key={course.id}>
          <strong>{course.title}</strong> — {course.description}
          <div> 
              <Link
                to="/data/courses/edit/$courseId"
                params={{ courseId: course.id }}
              >
                Edit Course
              </Link>
              |
              <Link
                to="/data/courses/delete/$courseId"
                params={{ courseId: course.id }}
              >
                Delete Course
              </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}