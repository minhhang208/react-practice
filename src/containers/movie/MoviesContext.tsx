import React, { createContext,  PropsWithChildren} from "react";
export const MoviesContext = createContext<string|null>(null);
function MoviesProvider({children}: PropsWithChildren<{}>){
  /* const [movies, setMovies] = useState([
        {
          name: "Harry Potter",
          price: "$17.99",
          id: 12322
        },
        {
          name: "Game of Thrones",
          price: "$50",
          id: 3432423
        },
        {
          name: "Avengers",
          price: "$30",
          id: 12433
        }
      ]); */
      console.log('Hello')
  return (
      <MoviesContext.Provider value={"Hello"}>
        {children}
      </MoviesContext.Provider>
  );
};


export { MoviesProvider };
export const MoviesConsumer = MoviesContext.Consumer;