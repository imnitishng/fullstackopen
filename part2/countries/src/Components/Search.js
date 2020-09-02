import React from 'react'

const Search = ({handleCountryChange}) => {
  return (
    <form>
      <div>
        find countries: <input onChange={handleCountryChange} />
      </div>
    </form>
  )
}

export default Search