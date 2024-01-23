import React from 'react'


export default function NextButton({answer, dispatch, numQuestion, index}) {
    if(answer === null) return null;

  if(index < numQuestion - 1) 
  return (
    <button className='btn btn-ui' onClick={()=> dispatch({type: "nextQuestion"})}>Next</button>
  )
  if(index === numQuestion - 1) 
  return (
    <button className='btn btn-ui' onClick={()=> dispatch({type: "finish"})}>Finish</button>
  )
}
