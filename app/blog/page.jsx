import React from 'react'


async function giveInfor() {
  let res=await  fetch('https://the-typetone-api.onrender.com')
  let data=res.json()
  console.log(data)
  return (
    <div>giveInfor</div>
  )
}

export default giveInfor