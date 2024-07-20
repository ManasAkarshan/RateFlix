export const fetchTvShow = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWRlZjY5ZmI2MDk1ZTAzMjNmZWQ3NjYxNzA4NGM5MCIsIm5iZiI6MTcyMTI5NDI5OC40ODEyMTIsInN1YiI6IjY2OThkOWU5YWYzYjhlNDNhNTgwNjk4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tqqrn9fKiASzMau2LuxlTKR0rYQ_3aRFS7RseFV12Us",
      },
    }
  );
  console.log(res);
  return res.json();
};

export const fetchMovies = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWRlZjY5ZmI2MDk1ZTAzMjNmZWQ3NjYxNzA4NGM5MCIsIm5iZiI6MTcyMTI5NDI5OC40ODEyMTIsInN1YiI6IjY2OThkOWU5YWYzYjhlNDNhNTgwNjk4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tqqrn9fKiASzMau2LuxlTKR0rYQ_3aRFS7RseFV12Us",
      },
    }
  );
  console.log(res);

  return res.json();
};

