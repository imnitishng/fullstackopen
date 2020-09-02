import React from 'react'

const Filter = ({searchTerm, handleSearch}) => (
  <p>
    filter shown with <input value={searchTerm} onChange={handleSearch}/>
  </p>
)

export default Filter