import { useEffect, useState } from 'react'
import { backendFetcher } from '../integrations/fetcher'

type Course = {
  id: string
  name: string
  role: string
}

export default function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const fetchCoursesFn = await backendFetcher<Course[]>('/courses')
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
          <strong>{course.name}</strong> — {course.role}
        </li>
      ))}
    </ul>
  );
}