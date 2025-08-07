
const CandidateList = ({candidateList}) => {
 console.log(candidateList)
  return (
    <div>
      {candidateList.map((value , index)=>(
            <div key={index} className='flex'>
              <div>{value.name}</div>
              <div>{value.party}</div>
              
            </div>
           ))}
    </div>
  )
}

export default CandidateList
