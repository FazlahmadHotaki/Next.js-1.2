import Link from 'next/link'
import React from 'react'

async function Blog() {
  let res=await  fetch('https://the-typetone-api.onrender.com/api/lessons')
  let data=await res.json()
  console.log(data.lessons)
  return (
    <div>Blog
        <h1>
            {data.lessons.map((item)=>{
                return(
                    <li key={item.id}>
                        <Link href={`/blog/${item.id}`}>{item.title}</Link>
                    </li>
                )
            })}
        </h1>
    </div>
  )
}

export default Blog