import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const initialItem = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovie = (props) => {
  const [item, setItem] = useState(initialItem);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        // console.log(res.data);
        // console.log(res.data.stars);
        setItem(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const changeHandler = (ev) => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "metascore") {
      value = parseInt(value, 10);
    }

    setItem({
      ...item,
      [ev.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then((res) => {
        //console.log(props);
        props.setMovieList(res.data);
        push(`/movies/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={item.title}
        />
        <div className="baseline" />
        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={item.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={item.metascore}
        />
        <div className="baseline" />

        <textarea
          rows="4"
          cols="50"
          name="starts"
          onChange={changeHandler}
          placeholder="starts"
          value={item.stars}
        ></textarea>
        <div className="baseline" />

        <button onClick={handleSubmit}>Done</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
