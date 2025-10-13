import { Link, createFileRoute, useParams } from '@tanstack/react-router'
import FooterNav from "../../../components/FooterNav"
import BackButton from "../../../components/BackButton"

export const Route = createFileRoute('/course/$courseId/')
({
    component: Course,
})

function Course() { // List the course's assignments
  const { courseId } = useParams({ from: '/course/$courseId/' })

  const assignments = [
    { id: '1', title: 'Assignment 1' },
    { id: '2', title: 'Assignment 2' },
  ]

  return (
  <div className="flex flex-col items-center p-6">
    <div className="flex-grow items-center space-y-6">
      <h1> Course: {courseId} </h1>
      <p> Welcome to {courseId}. Here you'll find things such as the description and assignments.</p>
      <div className="space">  
          {assignments.map(a => (
            <Link
              key={a.id}
              to="/course/$courseId/assignment/$assignmentId"
              params={{ courseId, assignmentId: a.id }}
              className="panel"
            >
              {a.title}
            </Link>
            ))}
      </div>
      <BackButton />
    </div>
    <div className="footer mt-auto w-full">
        <FooterNav />
    </div>
  </div>
  
  )
}
