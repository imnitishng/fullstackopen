import React from 'react'

const Print = ({name, exercises}) => (
  <p>{name} {exercises}</p>
)

const Name = ({parts}) => {
  console.log(parts)
  return (
  <>
    {parts.map((part) => 
    (<Print key={part.id} name={part.name} exercises={part.exercises} />))}
  </>
  )
}

const OneCourse = ({name, parts}) => {
  console.log(name)
  const total = parts.reduce((sum, tot) => (sum+tot.exercises), 0)
  console.log(total)
  return (
    <>
      <h1>{name}</h1>
      <Name parts={parts}/>      
      <b>total of {total} exercises</b>
    </>
  )
}

const Course = ({courses}) => {
  console.log(courses)
  return (
    <>  
      {courses.map((course) => 
      (<OneCourse key={course.id} name={course.name} parts={course.parts}/>))}
    </>
  )
}

export default Course