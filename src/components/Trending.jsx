import React from 'react'
import noMovie from '../assets/public/no-movie.png';

function Trending({index,poster_path,title}) {
  return (
    <>
      <p>{index}</p>
      <img 
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`: {noMovie}} 
        alt={title} 
      />
    </>
  )
}

export default Trending