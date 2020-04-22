import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const deleteItem = (e) => {
    //console.log(params.id);
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        //console.log(res);
        const newItems = movieList.filter(v => v.id !== res.data);
        setMovieList(newItems);
        console.log("newItems",newItems)
        push(`/`);

      })
      .catch((err) => console.log(err));
  };

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div
        className="update-button"
        onClick={() => push(`/update-movie/${params.id}`)}
      >
        Update
      </div>
      <div className="update-button" onClick={deleteItem}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
