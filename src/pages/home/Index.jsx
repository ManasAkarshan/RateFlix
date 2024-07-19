import React, { useState } from "react";
import { Button, Loader } from "semantic-ui-react";
import ColumnDisplay from "./ColumnDisplay";
import { fetchMovies, fetchTvShow } from "./query";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";



const Home = () => {
  const [displayType, setDisplayType] = useState("movies");


  // Fetching the data of movie/series (Query)
  const { data: movieData, isLoading: isMovieLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
  const { data: TvShowsData, isLoading: isTvShowsLoading } = useQuery({
    queryKey: ["tvShows"],
    queryFn: fetchTvShow,
  });

  if(localStorage.getItem("guest_session_id") === null){
    return <Navigate to={"/auth"}/>
  }

  return (
    <div style={{ marginTop: 50,  height:"auto", width:"100%"}}>
      <Button.Group>
        <Button
          color={displayType === "movies" ? "blue" : undefined}
          onClick={() => {
            setDisplayType("movies");
          }}
        >
          Movies
        </Button>
        <Button
          color={displayType === "tvShows" ? "blue" : undefined}
          onClick={() => {
            setDisplayType("tvShows");
          }}
        >
          Tv Shows
        </Button>
      </Button.Group>

      {isMovieLoading || isTvShowsLoading ? (
        <Loader></Loader>
      ) : (
        <div style={{ marginTop: 20 }}>
          {displayType === "movies" ? (
            <ColumnDisplay data = {movieData} displayType = {"movies"}></ColumnDisplay>
          ) : (
            <ColumnDisplay data={TvShowsData} displayType={"tvShows"}></ColumnDisplay>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
