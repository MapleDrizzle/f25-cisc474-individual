import { createFileRoute, useParams } from '@tanstack/react-router'
import FooterNav from "../../../../components/FooterNav"
import BackButton from "../../../../components/BackButton"

export const Route = createFileRoute(
  '/course/$courseId/assignment/$assignmentId'
)({
    component: Assignment,
})

function Assignment() { // Show assignment details and submission option
  const { courseId, assignmentId } = useParams({ from: '/course/$courseId/assignment/$assignmentId' })

  return (
  <div>
    <h1> {courseId} - Assignment {assignmentId} </h1>
    
    <div>
        <p>Problem:</p>
        <p>
          Description of Assignment {assignmentId}. Solve the problem
          and submit your work below.
        </p>
      </div>

      <button className="button-submit">
        Submit
      </button>
       <BackButton />
      <div className="footer mt-auto w-full">
          <FooterNav />
      </div>
    </div>
  )
}