import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Header,
  Image,
  List,
  Loader,
  Segment,
  Form,
} from "semantic-ui-react";
import { fetchMovieDetails } from "./query";
import { rateMovie } from "../home/mutation";
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify'

const Movie = () => {
  const [rating, setRating] = useState(0);

  const { id } = useParams();

  if (!id) {
    <div style={{ marginTop: "50px", height: "100vh" }}>Invalid id</div>;
  }

  // Rating related work (Mutation)
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

  const rate = rateMovieMutation;

  // Fetching details using movie id (query)
  const { data: movieData, isLoading: isLoadingMovie } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchMovieDetails(id),
  });

  if (isLoadingMovie) {
    return <Loader></Loader>;
  }

  return (
    <div style={{ marginTop: "50px" }}>
      <Segment>
        <Header>{movieData.title}</Header>
        <Grid columns={2} divided textAlign="left" style={{ marginTop: 20 }}>
          <Grid.Row>
            <Grid.Column width={6}>
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
                  size="medium"
                  centered
                ></Image>
              </div>
            </Grid.Column>
            <Grid.Column width={10}>
              <List>
                <List.Item>
                  <List.Header>For Adults only:</List.Header>
                  {movieData.adults ? "Yes" : "No"}
                </List.Item>
                <List.Item>
                  <List.Header>Genres: </List.Header>
                  {movieData.genres.map((genre) => {
                    return <List.Item key={genre.id}>{genre.name}</List.Item>;
                  })}
                </List.Item>
                <List.Item>
                  <List.Header>Budget:</List.Header>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(movieData.budget)}
                </List.Item>
                <List.Item>
                  <List.Header>IMDB ID:</List.Header> {movieData.imdb_id}
                </List.Item>
                <List.Item>
                  <List.Header>Popularity:</List.Header> {movieData.popularity}
                </List.Item>
                <List.Item>
                  <List.Header>Production Companies:</List.Header>
                  {movieData.production_companies.map(
                    (production_company, index) => {
                      return (
                        <List.Item
                          style={{ display: "inline" }}
                          key={production_company.id}
                        >
                          {production_company.name + ", "}
                        </List.Item>
                      );
                    }
                  )}
                </List.Item>
                <List.Item>
                  <List.Header>Release Date:</List.Header>{" "}
                  {movieData.release_date}
                </List.Item>
                <List.Item>
                  <List.Header>Revenue:</List.Header> {movieData.revenue}
                </List.Item>
                <List.Item>
                  <List.Header>Vote Average:</List.Header>{" "}
                  {movieData.vote_average}
                </List.Item>
                <List.Item>
                  <List.Header>Language:</List.Header>{" "}
                  {movieData.original_language}
                </List.Item>
              </List>
              <Form style={{ marginTop: "10px" }}>
                <Form.Group inline>
                  <Form.Field>
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
                          if (rating < 10) {
                            rate(id);
                          }
                        },
                      }}
                    ></Form.Input>
                  </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default Movie;
