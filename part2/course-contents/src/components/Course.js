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
  return (
    <>
      <h1>{course.name}</h1>
      <Name parts={course.parts}/>
    </>
  )
}

export default Course