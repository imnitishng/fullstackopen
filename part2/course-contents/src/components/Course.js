import React from 'react'

const Print = ({name, exercises}) => (
  <p>{name} {exercises}</p>
)

const Name = ({parts}) => (
  <>
    {parts.map((part) => 
    (<Print key={part.id} name={part.name} exercises={part.exercises} />))}
  </>
)

const Course = ({course}) => {
  const total = course.parts.reduce((sum, tot) => (sum+tot.exercises), 0)
  console.log(total)
  return (
    <>
      <h1>{course.name}</h1>
      <Name parts={course.parts}/>      
      <b>total of {total} exercises</b>
    </>
  )
}

export default Course