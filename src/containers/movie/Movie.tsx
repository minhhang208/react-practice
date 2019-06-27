import React from 'react';
import { movieType } from './type';
type Props = {
    movie: movieType;
}
const Movie = ({movie}: Props) => {
    return <>
        <h3>{movie.name}</h3>
        <p>{movie.price}</p>
    </>
}

export default Movie;