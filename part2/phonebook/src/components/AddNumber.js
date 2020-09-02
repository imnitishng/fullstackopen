import React from 'react'

const AddNumber = ({newNumber, newName, handleChange, handleNumberChange, addEntry}) => (
  <form onSubmit={addEntry}>
      <div>
          name: <input value={newName} onChange={handleChange}/>
      </div>
      <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
          <button type="submit">add</button>
      </div>
  </form>
)

export default AddNumber