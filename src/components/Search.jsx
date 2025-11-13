import React from 'react'
import searchIcon from '../assets/public/search.svg';

const Search = ({searchTerm,setsearchTerm}) => {

  return (
    <>
      <div className='search'>
        <div>
          <img src={searchIcon} alt="" />
          <input 
          type="text"  
          onChange={(e) => setsearchTerm(e.target.value)}
          value={searchTerm}
          placeholder='Search through 300+ movies online'/>

        </div>
      </div>
    </>
  )
}

export default Search