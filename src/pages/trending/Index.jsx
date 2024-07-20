import { useQuery } from "@tanstack/react-query";
import React, {useState} from "react";
import { fetchTrendingMovie, fetchTrendingTvShow } from "./query";
import { Loader, Menu } from "semantic-ui-react";
import ColumnDisplay  from '../home/ColumnDisplay'

const Trending = () => {
    const [displayType, setDisplayType] = useState("movies");
  const { data: trendingMovieData, isLoading: isTrendingMovieLoading } = useQuery({
    queryKey: ["trendingMovie"],
    queryFn: fetchTrendingMovie,
  });
  const { data: trendingTvShowData, isLoading: isTrendingTvShowLoading } = useQuery({
    queryKey: ["trendingTv"],
    queryFn: fetchTrendingTvShow,
  });

  if(isTrendingMovieLoading || isTrendingTvShowLoading){
    return <Loader></Loader>
  }
  return (
    <div style={{marginTop: 50}}>
        <Menu pointing  secondary pagination color="blue" size="huge" >
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
      {isTrendingMovieLoading || isTrendingTvShowLoading ? (
        <Loader></Loader>
      ) : (
        <div style={{ marginTop: 20 }}>
          {displayType === "movies" ? (
            <ColumnDisplay data = {trendingMovieData} displayType = {"movies"}></ColumnDisplay>
          ) : (
            <ColumnDisplay data={trendingTvShowData} displayType={"tvShows"}></ColumnDisplay>
          )}
        </div>
      )}
        
    </div>
    
  );
};

export default Trending;
