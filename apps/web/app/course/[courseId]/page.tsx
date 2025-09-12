export default async function Course({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  return (
  <div>
    <h1> Course: {courseId} </h1>
    <p> Welcome to {courseId}. Here you'll find things such as the description and assignments.</p>
  </div>
  )
}
