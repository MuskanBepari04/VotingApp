import axios from 'axios'
import React, { useEffect, useState } from 'react'

const VoteCount = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [voteList , setVoteList]=useState([])
    useEffect(()=>{
        axios.get(`${apiUrl}/voting/count`)
        .then((response)=>{
            console.log(response.data)
            setVoteList(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
  return (
    <div>
      {voteList.map((value , index)=>(
        <div key={index}>
            <div>{value.party}</div>
        <div>{value.voteCount}</div>
        </div>
      ))}
    </div>
  )
}

export default VoteCount
