export default function Course({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = params
  return (
  <div>
    <h1> Course: {id} </h1>
    <p> Welcome to {id}. Here you'll find things such as the description and assignments.</p>
  </div>
  )
}
