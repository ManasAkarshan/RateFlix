import React, { useState } from "react";
import { Loader, Menu, Form, FormField, Button } from "semantic-ui-react";
import ColumnDisplay from "./ColumnDisplay";
import { fetchMovies, fetchTvShow } from "./query";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const [displayType, setDisplayType] = useState("movies");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  // Fetching the data of movie/series (Query)
  const { data: movieData, isLoading: isMovieLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
  const { data: TvShowsData, isLoading: isTvShowsLoading } = useQuery({
    queryKey: ["tvShows"],
    queryFn: fetchTvShow,
  });


  if (localStorage.getItem("guest_session_id") === null) {
    return <Navigate to={"/auth"} />;
  }

  const handleSearch = () => {
    navigate(`/search/${text}`)
  };

  return (
    <div style={{ marginTop: 50, height: "auto", width: "100%" }}>
      <Menu pointing secondary pagination color="blue" size="huge">
        <Menu.Item
          name="Movies"
          active={displayType === "movies"}
          onClick={() => setDisplayType("movies")}
        />
        <Menu.Item
          name="TV Shows"
          active={displayType === "tvShows"}
          onClick={() => setDisplayType("tvShows")}
        />
      </Menu>

      <Form
        style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 10 }}
      >
        <input
          required
          onChange={(e) => {
            setText(e.target.value);
            console.log(text);
          }}
          value={text}
          placeholder="Search..."
        />
        <Button
          onClick={() => {
            if(text.trimStart().length === 0){
              alert("Enter some data")
            }
            else {handleSearch();}
          }}
          size="small"
        >
          Search
        </Button>
      </Form>

      {isMovieLoading || isTvShowsLoading ? (
        <Loader></Loader>
      ) : (
        <div style={{ marginTop: 20 }}>
          {displayType === "movies" ? (
            <ColumnDisplay
              data={movieData}
              displayType={"movies"}
            ></ColumnDisplay>
          ) : (
            <ColumnDisplay
              data={TvShowsData}
              displayType={"tvShows"}
            ></ColumnDisplay>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
