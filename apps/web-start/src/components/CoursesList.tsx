import { useEffect, useState } from 'react'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { backendFetcher } from '../integrations/fetcher'
import type { CourseOut } from '@repo/api';


const coursesQueryOptions = {
  queryKey: ['courses'],
  queryFn: backendFetcher<Array<CourseOut>>('/courses'),
  initialData: [],
};

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
        </li>
      ))}
    </ul>
  );
}