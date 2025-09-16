import FooterNav from "../../../../../components/FooterNav"
import BackButton from "../../../../../components/BackButton"

export default async function Course({
  params,
}: {
  params: Promise<{ courseId: string; assignmentId: string }>
}) {
  const { courseId, assignmentId } = await params
  return (
  <div className="flex flex-col items-center p-6">
    <h1> {courseId} - Assignment {assignmentId} </h1>
    
    <div className="w-full max-w-md">
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