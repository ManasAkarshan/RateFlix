import React, { useState } from "react";
import { fetchSeriesDetails } from "./query";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Accordion, Grid, Header, Image, Label, List, Loader, Segment, Card, Form } from "semantic-ui-react";
import { rateTvShow } from "../home/mutation";
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify'


const TvShow = () => {
  const [rating, setRating] = useState(0);

  const { id } = useParams();
  console.log(id);

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

  const {mutate : rateTvShowMutation} = useMutation({
    mutationKey:["rateTvShow"],
    mutationFn: (id) =>{
      rateTvShow(id, rating)
    },
    onSuccess: onSuccess,
    onError: onError
  });

  const rate = rateTvShowMutation;

  // Fetching show details using id (query)

  const { data: seriesData, isLoading: isSeriesLoading } = useQuery({
    queryKey: ["tvSeries"],
    queryFn: ()=>fetchSeriesDetails(id),
  });

  if (isSeriesLoading) {
    return <Loader></Loader>;
  }

  const seasonPanel = seriesData.seasons.map((season)=>{
    return {
      key : season.id,
      title : `Season ${season.season_number}`,
      content :{
        content: <Card style={{height:"70px"}} meta={season.air_date} description={`${season.episode_count} episodes`} />
      }
    }
  })

  return (
    <div style={{ marginTop: "50px" }}>
      <Segment>
        <Header>{seriesData.name}</Header>
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
              ><Image
              src={`https://image.tmdb.org/t/p/original/${seriesData.poster_path}`}
              size="medium"
              centered
            ></Image></div>
            </Grid.Column>
            <Grid.Column width={10}>
            <List>
                <List.Item style={{marginBottom:8}}>
                  <List.Header as={"h4"}>For Adults only:</List.Header>
                  {seriesData.adults ? "Yes" : "No"}
                </List.Item>
                <List.Item style={{marginBottom:8}}>
                  <List.Header as={"h4"}>First Air Date:</List.Header>
                  {seriesData.first_air_date }
                </List.Item>
                <List.Item style={{marginBottom:8}}>
                  <List.Header as={"h4"}>Genres: </List.Header>
                  {seriesData.genres.map((genre) => {
                    return <Label key={genre.id}>{genre.name}</Label>;
                  })}
                </List.Item >
                <List.Item style={{marginBottom:8}}>
                  <List.Header as={"h4"}>Popularity:</List.Header> {seriesData.popularity}
                </List.Item>
                <List.Item style={{marginBottom:8}}>
                <List.Header as={"h4"}>Production Companies:</List.Header>
                  {seriesData.production_companies
                  .map((production_company, index) => {
                    return <Label style={{margin:"2px 2px 2px 0"}} key={production_company.id}>{production_company.name + ', '}</Label>;
                  })}
                </List.Item>

                <List.Item style={{marginBottom:8}}>
                  <List.Header as={"h4"}>Revenue:</List.Header> {seriesData.revenue}
                </List.Item>
                <List.Item style={{marginBottom:8}}>
                  <List.Header as={"h4"}>Number of seasons:</List.Header> {seriesData.number_of_seasons}
                </List.Item>
                <List.Item style={{marginBottom:8}}>
                  <List.Header as={"h4"}>Number of episodes:</List.Header> {seriesData.number_of_episodes}
                </List.Item>
                <List.Item style={{marginBottom:8}}>
                  <List.Header as={"h4"}>Seasons:</List.Header> 
                  <List.Description style={{maxHeight:"200px", overflowY:"scroll"}}> 
                    <Accordion defaultActiveIndex={0} panels={seasonPanel} styled>

                    </Accordion>
                  </List.Description>
                </List.Item>
                
                <List.Item style={{marginBottom:8}}>
                  <List.Header as={"h4"}>Vote Average:</List.Header> {seriesData.vote_average}
                </List.Item>
                <List.Item style={{marginBottom:8}}> 
                  <List.Header as={"h4"}>Language:</List.Header> {seriesData.original_language}
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

export default TvShow;
