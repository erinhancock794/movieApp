
const apiKey = '?apikey=2165774a';

$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios.get(`http://www.omdbapi.com${apiKey}&s=${searchText}`)
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
      <div class="col-md-3">
        <div class="well text-center">
          <img src="${movie.Poster}">
          <h5>${movie.Title}</h5>
          <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
        </div>
      </div>
      `;
      });
      $('#movies').html(output);
    })
    .catch((error) => {
      console.log('---->error', error)
    })
}


function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html'
  return false;
} 

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  axios.get(`http://www.omdbapi.com${apiKey}&i=${movieId}`) //tt0099785
  .then((response) => {
    console.log(response.data)
    let movie = response.data;
    let output = `
    <div class="row">
      <div class = "col-md-4">
        <img src="${movie.Poster}" class="thumbnail">
      </div>
      <div class="col-md-8">
        <h4>${movie.Title+ ' (' + movie.Year+ ')'}</h4>
        <ul class="list-group">
        <li class="list-group-item"> ${movie.Plot}</li>
          <li class="list-group-item"<strong>Cast: </strong> ${movie.Actors}</li>
          <li class="list-group-item"<strong>Directed: </strong> ${movie.Director}</li>
          <li class="list-group-item"<strong>Awards: </strong> ${movie.Awards}</li>
          <li class="list-group-item"<strong>Rated: </strong> ${movie.Rated}</li>
      </div>
    </div>
    <div class="row">
      <div class="well">
      <hr>
        <a href="http://imdb.com/title/${movie.imdbID}" target="blank" class="btn btn-primary"> View IMDB </a>
        <a href="index.html" class="btn btn-default">Back to Search </a>
      </div>
    </div>
    `;
    $('#movie').html(output);
  
  })
  .catch((error) => {
    console.log('---->error', error)
  })
}