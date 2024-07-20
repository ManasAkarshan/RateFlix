import React, { useState } from "react";
import { Container, Header, Loader, Menu, Segment } from "semantic-ui-react";
import { fetchRatedMovies, fetchRatedTvShows } from "./query";
import ColumnDisplay from "../home/ColumnDisplay";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

const Rated = () => {
  const [activeTab, setActiveTab] = useState("movies");

  const { data: ratedMoviesData, isLoading: isLoadingMovieRated } = useQuery({
    queryKey: ["ratedMovies"],
    queryFn: fetchRatedMovies,
  });
  const { data: ratedTvShowsData, isLoading: isLoadingTvShowsRated } = useQuery(
    {
      queryKey: ["ratedTvShows"],
      queryFn: fetchRatedTvShows,
    }
  );

  if(localStorage.getItem("guest_session_id") === null){
    return <Navigate to={"/auth"}/>
  }

  return (
    <Container style={{ marginTop: "50px" }}>
      <Menu pointing secondary color="blue" size="large" >
        <Menu.Item
          name="Movies"
          active={activeTab === "movies"}
          onClick={() => setActiveTab("movies")}
        />
        <Menu.Item
          name="TV Shows"
          active={activeTab === "tvShows"}
          onClick={() => setActiveTab("tvShows")}
        />
      </Menu>
      {isLoadingMovieRated || isLoadingTvShowsRated ? (
        <Loader></Loader>
      ) : (
        <Segment>
          {activeTab === "movies" ? (
            <div>
              <Header as={"h2"}>Rated Movies</Header>
              <ColumnDisplay data={ratedMoviesData} displayType={"movies"} isRated={true}/>
            </div>
          ) : (
            <div>
              <Header as={"h2"}>Rated Movies</Header>
              <ColumnDisplay data={ratedTvShowsData} displayType={"tvShows"} isRated={true}/>
            </div>
          )}
        </Segment>
      )}
    </Container>
  );
};

export default Rated;
