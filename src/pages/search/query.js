export const searchData = async (text) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${text}&include_adult=false&language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWRlZjY5ZmI2MDk1ZTAzMjNmZWQ3NjYxNzA4NGM5MCIsIm5iZiI6MTcyMTMxNjUyOS42MjEwMTYsInN1YiI6IjY2OThkOWU5YWYzYjhlNDNhNTgwNjk4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qXEOhCzexl05bdGQogyKQzMTkqI2GlSCbcMlQhFVgfM",
        },
      }
    );
    console.log(res);
  
    return res.json();
  };
  