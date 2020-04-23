import React from 'react';

const MovieCard = props => {
  //console.log(props.movie.stars)
  const { title, director, metascore, stars } = props.movie;
  console.log("stars",{stars})
  //console.log("stars",props.movie.stars)
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>
{stars}
      {/* {stars.split(",").map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))} */}
    </div>
  );
};

export default MovieCard;