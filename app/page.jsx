import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>HOme

      <h2>
            <Link href={"/blog"}>Blog Page</Link>

      </h2>
    </div>
  )
}

export default page