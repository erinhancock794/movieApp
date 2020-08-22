
const apiKey = '?i=tt3896198&apikey=2165774a';

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

function getMovie(id){
  let movieId = sessionStorage.getItem('movieId');
  axios.get(`http://www.omdbapi.com${apiKey}&i=${movieId}`)
  .then((response) => {
    console.log(response);
  
  })
  .catch((error) => {
    console.log('---->error', error)
  })
}