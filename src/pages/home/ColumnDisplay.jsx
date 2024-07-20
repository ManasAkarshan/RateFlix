import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Grid, Label } from "semantic-ui-react";
import {rateMovie,  rateTvShow} from './mutation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ColumnDisplay = ({ data, displayType, isRated=false, }) => {
  const [movieData, setMovieData] = useState([]);
  const [rating, setRating] = useState(-1);


  // Rating the movie/series (Mutation)
  const onSuccess = ()=>{
    toast.success("Successfully rated")
  }
  const onError = ()=>{
    toast.success("Something went wrong")
  }

  const {mutate : rateMovieMutation} = useMutation({
    mutationKey:["rateMovie"],
    mutationFn: (id) =>{
      rateMovie(id, rating)
    },
    onSuccess: onSuccess,
    onError: onError
  });
  const {mutate : rateTvShowMutation} = useMutation({
    mutationKey:["rateTvShow"],
    mutationFn: (id) =>{
      rateTvShow(id, rating)
    },
    onSuccess: onSuccess,
    onError: onError
  });
  

  // getting result array from the data json file
  useEffect(() => {
    setMovieData(data.results);
    console.log("The data is", movieData);
  }, [data]);

  const rate = displayType === "movies" ? rateMovieMutation : rateTvShowMutation

  if(movieData === undefined){
    return <div>No data found :{'('}</div>
  }

  return (
    <div>
      {movieData.length > 0 ? (
        <Grid
          columns={3}
          stackable
          centered
          verticalAlign="top"
          padded="vertically"
        >
          {movieData.map((item, ind) => {
            return (
              <>
                {item.overview && (
                  <Grid.Column key={item.id}>
                    <Card.Group
                      style={{ minHeight: "750px", paddingBottom: "8px" }}
                    >
                      <Link
                        to={
                          (displayType === "movies")
                            ? `/movie/${item.id}`
                            : `/tvshow/${item.id}`
                        }
                      >
                        <Card
                          style={{ minHeight: "830px" }}
                          fluid
                          header={
                            item.media_type === undefined ? (displayType === "movies" )
                              ? movieData[ind].original_title
                              : movieData[ind].original_name :
                              (item.media_type === 'movie' ? movieData[ind].title : movieData[ind].name )
                          }
                          image={item.poster_path? `https://image.tmdb.org/t/p/original/${item.poster_path}` : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'}
                          meta={`Release Date: ${item.release_date} | Ratings ${item.vote_average}`}
                          description={item.overview.slice(0, 400)}
                          
                          extra={isRated && <Label  size="large" color="green">Your Rating : {item.rating}</Label>}
                        ></Card>
                        
                      </Link>
                      {!isRated && <Form  style={{ marginTop: "10px",}}>
                        <Form.Group inline  >
                          <Form.Field >
                            <Form.Input
                              type="number"
                              min="0"
                              max="10"
                              step="0.5"
                              onChange={(e) => {
                                setRating(e.target.value);
                              }}
                              action={{
                                color: "blue",
                                labelPosition: "right",
                                icon: "star",
                                content: "Rate",
                                onClick: () => {
                                  if(rating < 10 && rating >= 0) {
                                    rate(item.id)
                                  }
                                }
                              }}
                            ></Form.Input>
                          </Form.Field>
                        </Form.Group>
                      </Form>}
                    </Card.Group>
                  </Grid.Column>
                )}
              </>
            );
          })}
        </Grid>
      ) : (
        <div>Waiting for response</div>
      )}
    </div>
  );
};

export default ColumnDisplay;
