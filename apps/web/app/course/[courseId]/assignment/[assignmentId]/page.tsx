import FooterNav from "../../components/FooterNav"

export default async function Course({
  params,
}: {
  params: Promise<{ courseId: string; assignmentId: string }>
}) {
  const { courseId, assignmentId } = await params
  return (
  <div className="min-h-screen bg-amber-800 flex flex-col items-center p-6">
    <h1 className="text-2xl font-bold text-white mb-6"> {courseId} - Assignment {assignmentId} </h1>
    
    <div className="w-full max-w-md bg-amber-100 rounded-xl p-6 mb-6 shadow">
        <p className="text-lg font-medium">Problem:</p>
        <p className="mt-2 text-gray-700">
          Description of Assignment {assignmentId}. Solve the problem
          and submit your work below.
        </p>
      </div>

      <button className="w-full max-w-md bg-lime-400 hover:bg-lime-500 text-black font-bold py-3 rounded-xl shadow transition">
        Submit
      </button>
      <FooterNav />
    </div>
  )
}