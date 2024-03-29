import React from 'react'

export default function Progress({index, numQuestions, points, answer, numPoints}) {
  return (
    <header className='progress'>
    <progress max={numQuestions} value={index + Number(answer !== null)}/>
      <p>Question <strong>{index + 1}</strong>  / {numQuestions}</p>
      <p><strong>{points}</strong>  / {numPoints} points</p>
    </header>
  )
}
