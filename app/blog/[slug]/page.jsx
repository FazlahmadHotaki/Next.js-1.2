async function SlugTwo({ params }) {
  const { slug } = await params

  console.log("SLUG:", slug)

  const res = await fetch(
    `https://the-typetone-api.onrender.com/api/lessons/${slug}`
  )

  console.log("STATUS:", res.status)

  const data = await res.json()

  console.log("DATA:", data)

  return (
    <div>
      <h1>Hi</h1>
      <h2>{slug}</h2>
      <p>{data.level}</p>
    </div>
  )
}

export default SlugTwo