import React, {  useContext } from "react";
import { MoviesContext } from "./MoviesContext";

const MovieList = () => {
  const value = useContext(MoviesContext);
  return (
    <>
      <h1>{value}</h1>      
    </>
  );
};

export default MovieList;
