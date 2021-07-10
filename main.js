const BASE_URL = 'https://api.themoviedb.org/3';
// 인기순: /discover/movie?sort_by=popularity.desc
const API_QUERY = '/discover/movie?sort_by=popularity.desc&';
const API_KEY = 'api_key=224502cedb2aea2828098f3724fd0b0c';
const API_URL = BASE_URL + API_QUERY + API_KEY

function getMovies(url) {
  fetch(url)
    .then(function(res) {
      return res.json()
    })
    .then(function(movies) {
      showMovies(movies)
    })
}

function showMovies(data) {
  const movies = data.results;
  let html_li = '';

  movies.forEach(function(movie){
    const title = movie.original_title;
    const text = movie.overview;
    const poster = movie.poster_path;
    const vote_average = movie.vote_average;
    const release_date = movie.release_date;
    // 이미지 서버 주소
    const IMG_URL = 'https://image.tmdb.org/t/p/w500/'

    // li 요소 생성
    const html_li = document.createElement('li')
    const list = document.querySelector('#main .movie-list');

    html_li.innerHTML =  `
        <figure>
          <img src='${IMG_URL + poster}' alt='${title}' />
        </figure>  
        <h4>${title}</h4>
        <span class='vote'>평점: ${vote_average}</span>
        <span class='release-date'>개봉일: ${release_date}</span>
    `
    list.appendChild(html_li);
  })
}

getMovies(API_URL)