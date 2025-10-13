import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/course/')({
  component: CoursesHome,
})

function CoursesHome() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">All Courses</h1>
      <p>Select a course from the student dashboard to view assignments.</p>
    </div>
  )
}